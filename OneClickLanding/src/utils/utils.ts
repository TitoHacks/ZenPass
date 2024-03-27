import bcrypt from 'bcryptjs';
import forge from 'node-forge';
import { passwordStrength } from 'check-password-strength'
import getRootDomain from 'get-root-domain';
import { toast } from 'sonner';
import { mkConfig, generateCsv, download } from "export-to-csv";

const ivKey = forge.random.getBytesSync(16);
const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "ZenPass Passwords", quoteStrings:false });

export function hashPassword(password:string):string{

    return bcrypt.hashSync(password,10);

}
//Metodo que recive una contrasñea y un hash, para determinar si coinciden.
export function matchesPassword(password:string, hashedPassword:string):boolean{
    bcrypt.compare(password,hashedPassword,function(err,isMatch){
        if(isMatch){
            return true;
        }
    });
    return false;
}

//Metodo que recive la contraseña del usuario, un salt y el numero de iteraciones, para calcular una contraseña maestra derivada de la original
//haciendo uso de la libreria forge pbkdf2
export async function storeDerivateKey(originalPassword:string, salt:string, iterations:number){
    const KEY_LENGTH = 32;
    return new Promise((resolve,reject)=>{
        forge.pkcs5.pbkdf2(originalPassword,salt,iterations,KEY_LENGTH,'sha512',(err, derivedKey) => {
            if (err) {
                console.error("Error al derivar la clave:", err);
                reject(err);
            }
    
            sessionStorage.setItem("derivatedKey",forge.util.bytesToHex(derivedKey));
            resolve(true);
        });
    });
        
}
//Metodo que elimina todos los datos de la sesion actual, para cerrarla
export function logout(){
    sessionStorage.removeItem("derivatedKey");
    sessionStorage.removeItem("PassnovaUID");
    window.location.href = "/";
}

//Metodo que devuelve la fuerza de una contraseña
export function getPasswordScore(password:string):string{
    return passwordStrength(password).value;
}

//Metodo que recive una credencial y su status (realmente score), para determinar el estado de una credencial.
//Para detectar las filtraciones de datos, se utiliza el metodo checkLeaked
export async function generateStatus(entry:Entry,passwordStatus:string,skipLeakCheck:boolean = false):Promise<string>{

    let estado:string;

    //Mirar si la contraseña esta filtrada
    let leaks = [];
    if(!skipLeakCheck){
      leaks = await checkLeaked(entry);
    }
    
    if(leaks.length > 0 ){
      estado = "leaked";
    }else if(passwordStatus == "Weak" || passwordStatus == "Too weak"){
      estado = "weak";
    } else{
      estado = "safe";
    }
    return estado;

}

//Metodo que elimina una credencial, llamando a /entry/deleteEntry pasando el entryId que recive como parametro.
export async function deleteEntry(entryId:string):Promise<string>{
    let message = await fetch("/api/entry/deleteEntry",{
        method:"POST",
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify({passwordId: entryId})
      }).then(response => response.text()).then(data=>{
        return data;
      })
    return message;
}


//Metodo que recive un objeto values (Representan una credencial), y se almacenan en bd encriptados.
export async function storeEntry(values:any, skipLeakCheck:boolean = false){
    toast.info("Encrypting data...");
    let encryptedPassword = encrypt(values["password"]);
    let passwordScore = getPasswordScore(values["password"])
    let estados = await generateStatus(values,passwordScore, skipLeakCheck);
    let leakInfo = [];
    toast.info("Checking for leaks...");
    if(estados == "leaked"){
      let leak = await checkLeaked(values);
      if(leak.length > 0){
        leakInfo = await getLeakedInfo(leak[0]["Name"]);
        console.log(leakInfo);
      }
    }

    let encryptedEntry = {
        title: encrypt(values["title"]),
        username:encrypt(values["username"]),
        password:encryptedPassword,
        url:encrypt(values["url"]),
        score:passwordScore,
        status:estados,
        ownerId:sessionStorage.getItem("PassnovaUID"),
        isWeb:values["isWeb"],
        iv:forge.util.bytesToHex(ivKey),
        leakInfo: leakInfo,
    }

    return await fetch("/api/entry/newEntry",{
        method:"POST",
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(encryptedEntry)
      })

}

//Metodo que elimina todas las credenciales almacenadas del usuario actual.
export async function deleteAllData(){
  let userId = sessionStorage.getItem("PassnovaUID");
  let serverMsg =  await fetch("/api/entry/deleteAllData",{
    method:"POST",
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body:JSON.stringify({_id:userId})
  })
  if(serverMsg.status == 200){
    toast.success(await serverMsg.text());
  }else{
    toast.error(await serverMsg.text());
  }
  

}

//Metodo que obtiene todas las credenciales correspondientes al usuario actual, crea un archivo csv, y lo descarga
export async function exportCSV(setLoadingExport:any){
  setLoadingExport(true);
  let entries:Entry[] = await getEntries();
  let formatedEntries:any[] = [];
  entries.forEach((entry)=>{
    let formatedEntry = {
        name: entry.title,
        url: entry.url,
        username: entry.username,
        password: entry.password,
        note: ""
    }
    formatedEntries.push(formatedEntry);
  })
  let generatedCsv = generateCsv(csvConfig)(formatedEntries);
  download(csvConfig)(generatedCsv);
  setLoadingExport(false);
  toast.success("Data exported successfully!");

}

//Metodo que recive los valores actualizados de una credencial y la credencial antigua, para posteriormente actualizar en bd.
export async function editData(userInput:string, passwordInput:string, urlInput:string, titleInput:string, entryObj:Entry, setUpdated:any){
  console.log("username: " + userInput + ", password: " + passwordInput + ", url: " + urlInput);

  entryObj.title = titleInput;
  entryObj.username = userInput;
  entryObj.password = passwordInput;
  entryObj.status = await generateStatus(entryObj,entryObj.score!,true);
  entryObj.url = urlInput;


  let serverData = await updateEntry(entryObj);
  if(serverData.status == 200){
    toast.success(await serverData.text());
  }else{
    toast.error(await serverData.text());
  }
}

//Metodo que obtiene datos ya leidos de un archivo csv, y añade las correspondientes entradas a la bd utilizando el metodo storeEntry.
export async function importPasswords(data:any, fileInfo:any, originalFile:any, setLoadValue:any, onClose:any){

  console.log(data);
  let csvKeys = Object.keys(data);

  for(let i = 0; i < csvKeys.length; i++){
    let currentPassword = data[csvKeys[i]];
    let entryObj = {
      title: currentPassword["name"],
      username:currentPassword["username"],
      password:currentPassword["password"],
      url:currentPassword["url"],
      ownerId:sessionStorage.getItem("PassnovaUID"),
      isWeb:"true",
    }
   let serverData = await storeEntry(entryObj,true);
   if(serverData.status ==500){
      toast.error("Error al importar contraseña");
   }
   console.log("Progreso Actual: " + (i+1) * 100 / csvKeys.length + "%")
   setLoadValue((i+1) * 100 / csvKeys.length);
  }
  onClose();
  toast.success("Contraseñas importadas correctamente");
  
}

//Metodo que recive una url y un tamaño (pixeles), y devuelve el favicon de la url.
export function getFavIcon(url:string, size:number):string{
  let favicon = "public/defaultIcon.png";
  if(url.includes("https") || url.includes("http")){
    let rootDomain = getRootDomain(url)
    try{
      return "https://noisy-crimson-chinchilla.faviconkit.com/" + rootDomain  + "/" + size;
      //return "https://www.google.com/s2/favicons?domain="+rootDomain + "&sz=" + size;
    }catch(error){
      favicon = "public/defaultIcon.png";
    }
    
  }
  return favicon;

}

//Metodo que recive un objeto Entry y actualiza la correspondiente entrada en BD, llamando a la api /entry/updateEntry en el backend.
export async function updateEntry(entry:Entry){
  let encryptedPassword = encrypt(entry.password);
  let passwordScore = getPasswordScore(entry.password!)
  console.log("Id:" + entry._id);
  let encryptedEntry = {
      _id:entry._id,
      title: encrypt(entry.title),
      username:encrypt(entry.username),
      password:encryptedPassword,
      url:encrypt(entry.url),
      score:passwordScore,
      status:entry.status,
      ownerId:sessionStorage.getItem("PassnovaUID"),
      isWeb:entry.isWeb,
      iv:forge.util.bytesToHex(ivKey),
      leakInfo: entry.leakInfo,
  }

  return fetch("/api/entry/updateEntry",{
      method:"POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body:JSON.stringify(encryptedEntry)
    })
}


//Metodo que recive un objeto credencial y realiza una llamada a la api /entry/checkLeak, para determinar si una credencial ha sido filtrada online.
//Como mucho se realizan 3 intentos.
export async function checkLeaked(entry:any):Promise<any>{
  let retryCount = 0;
  while(retryCount < 3){
    let leaks = await fetch("/api/entry/checkLeak?email=" + entry.username + "&domain="+getRootDomain(entry.url) + "&timestamp=" + new Date().getTime());
    console.log(leaks);
    if(leaks.status == 200){
      return await leaks.json();
    }else if(leaks.status == 300){
      return {};
    }else if(leaks.status == 301){
      let data = await leaks.json();
      console.log("Retrying after " + (data["retry"] + 2) + "seconds");
      await new Promise(resolve => setTimeout(resolve,(data["retry"] + 10) * 1000));
      retryCount++;
    }
  }

 

  return {}

}
//Metodo que realiza una llamada a /entry/leakDetails para obtener los detalles de una filtracion.
export async function getLeakedInfo(breachName:string):Promise<any>{
  let leakInfo = await fetch("/api/entry/leakDetails?name=" + breachName);
    if(leakInfo.status == 200){
      let leakInfoJson = await leakInfo.json();
      return leakInfoJson;
    }
    return {};
}

//Metodo encargado de determinar si una credencial ya almacenada en bd ha sido filtrada online.
//Utilizada para el boton "Analizar"
export async function checkExistingLeaked(entry:Entry){
  let leaks = await checkLeaked(entry);
  if(leaks.length > 0){
    //Actualizar entry y cambiar estado a leaked
    if(entry.status! != "leaked"){
      entry.status! = "leaked";
      entry.leakInfo =  await getLeakedInfo(leaks[0]["Name"]);
      updateEntry(entry);
    }
    ////////////////////////////////////////////

  }

}

//Metodo utilizado para calcular los puntos correspondientes al score de una credencial
export function getScorePoints(score:string):number{
  let scorePoints = 25;
  switch(score){
    case 'Weak':
      scorePoints = 50;
      break;
    case 'Medium':
      scorePoints = 75;
      break;
    case 'Strong':
      scorePoints = 100;
      break;
    default:
      scorePoints = 25;
      break;

  }
  return scorePoints;
}


//Metodo encargado de recuperar las credenciales de un usuario, haciendo una peticion get al sevidor.
//El servidor responde con datos encriptados, y el cliente los desencripta antes de devolverlos.
export async function getEntries():Promise<any[]>{

    let decryptedEntries:any[] = [];

    await fetch("/api/entry/getEntries?passnovaUID=" + sessionStorage.getItem("PassnovaUID"),{
        method:"get",

      }).then(response => response.json()).then(async data=>{
        const promises = data.map((entry:any) =>{
          let iv = entry["iv"];
          let originalIV = forge.util.hexToBytes(iv);
          let decryptedUrl = decrypt(entry["url"],originalIV);
          let favicon = getFavIcon(decryptedUrl,48);
          let entryObj = {
              _id: entry["_id"],
              __v: entry["__v"],
              title: decrypt(entry["title"],originalIV),
              username: decrypt(entry["username"],originalIV),
              password: decrypt(entry["password"],originalIV),
              url: decryptedUrl,
              score: entry["score"],
              scorePoints: getScorePoints(entry["score"]),
              isWeb: entry["isWeb"],
              status: entry["status"],
              favicon: favicon,
              iv:iv,
              leakInfo: entry["leakInfo"],
          }
          decryptedEntries.push(entryObj);
        })

            
        
      })

      return decryptedEntries;


}

//Metodo utilizado para encriptar los datos en el cliente antes de enviarlos al servidor.
//Se utiliza la clave derivada guardada en sesion para encriptar, y se utiliza el iv(cadena de caracteres random)
//para que el resultado encriptado no sea el mismo.
export function encrypt(value:any):string{

        let derivatedKey = sessionStorage.getItem("derivatedKey");
        const cipher = forge.cipher.createCipher('AES-CTR', forge.util.hexToBytes(derivatedKey!));
        cipher.start({iv:ivKey});
        cipher.update(forge.util.createBuffer(value));
        cipher.finish();
        return cipher.output.toHex();

}

//Metodo utilizado para desencriptar los datos recibidos desde el servidor.
//Mismo procedimiento que encrypt()

export function decrypt(value:any, ivKey:any):string{
        let derivatedKey = sessionStorage.getItem("derivatedKey");
        const decipher = forge.cipher.createDecipher('AES-CTR', forge.util.hexToBytes(derivatedKey!));
        decipher.start({iv:ivKey});
        decipher.update(forge.util.createBuffer(forge.util.hexToBytes(value)));
        decipher.finish();
        return decipher.output.data;
}

//Metodo que recive un array de credenciales, para mostrar la cantidad de credenciales (en porcentaje) que corresponden al computo
//total de credenciales.
export function getStatusCount(passwordEntries:any[]):Status{
    let safePasswordCount = 0;
    let weakPasswordCount = 0;
    let reusedPasswordCount = 0;
    let leakedPasswordCount = 0;
    passwordEntries.forEach((entry)=>{
        switch(entry["status"][0]){
          case 'safe':
            safePasswordCount++;
            break;
          case 'weak':
            weakPasswordCount++;
            break;
          case 'reused':
            reusedPasswordCount++;
            break;
          case 'leaked':
            leakedPasswordCount++;
            break;
          default:
            safePasswordCount++;
            break;
    
        }
      })
    
      let totalCount = safePasswordCount + weakPasswordCount + reusedPasswordCount + leakedPasswordCount;
      let safePorcent = (safePasswordCount*100)/totalCount;
      if(isNaN(safePorcent)){
        safePorcent = 0;
      }
      let weakPorcent = (weakPasswordCount*100)/totalCount;
      if(isNaN(weakPorcent)){
        weakPorcent = 0;
      }
      let reusedPorcent = (reusedPasswordCount*100)/totalCount;
      if(isNaN(reusedPorcent)){
        reusedPorcent = 0;
      }
      let leakedPorcent = (leakedPasswordCount*100)/totalCount;
      if(isNaN(leakedPorcent)){
        leakedPorcent = 0;
      }
    let dataObj:Status = {
      safeCount: safePasswordCount,
      safePorcent: safePorcent,
      weakCount: weakPasswordCount,
      weakPorcent: weakPorcent,
      reusedCount: reusedPasswordCount,
      reusedPorcent: reusedPorcent,
      leakedCount: leakedPasswordCount,
      leakedPorcent: leakedPorcent,
    }

    return dataObj;


}
