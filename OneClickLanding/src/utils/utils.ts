import bcrypt from 'bcryptjs';
import forge from 'node-forge';
import { passwordStrength } from 'check-password-strength'
import getRootDomain from 'get-root-domain';
const ivKey = forge.random.getBytesSync(16);

export function hashPassword(password:string):string{

    return bcrypt.hashSync(password,10);

}

export function matchesPassword(password:string, hashedPassword:string):boolean{
    bcrypt.compare(password,hashedPassword,function(err,isMatch){
        if(isMatch){
            return true;
        }
    });
    return false;
}


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

export function logout(){
    sessionStorage.removeItem("derivatedKey");
    sessionStorage.removeItem("PassnovaUID");
    window.location.href = "/";
}


export function getPasswordScore(password:string):string{
    return passwordStrength(password).value;
}


export async function generateStatus(entry:Object,encryptedPassword:string, passwordStatus:string):any[]{

    let estados:any[] = [];
    //Mirar si es contraseña reutilizada;
    /*fetch("/api/entry/isReused?=" + encryptedPassword ,{
        method:"GET"
    }).then(response => response.json()).then(data=>{
        if(data["reused"]){
            estados.push("reused");
        }
    })*/

    //Mirar si la contraseña esta filtrada

    let leaks = await checkLeaked(entry);
    if(leaks.length > 0 ){
      estados[0] = "leaked";
    }else if(passwordStatus == "Weak" || passwordStatus == "Too weak"){
      estados[0] = "weak";
    } 


    





   
    


    if(estados.length == 0){
        estados[0] = "safe";
    }

    return estados;

}


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



export async function storeEntry(values:any){
    console.log("Saving entry...");
    let encryptedPassword = encrypt(values["password"]);
    let passwordScore = getPasswordScore(values["password"])
    let estados = await generateStatus(values,encryptedPassword,passwordScore);
    let leakInfo = [];
    if(estados.includes("leaked")){
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

    fetch("/api/entry/newEntry",{
        method:"POST",
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(encryptedEntry)
      })
      console.log("Entry saved!");


}

export function getFavIcon(url:string, size:number):string{
  let favicon = "public/defaultIcon.png";
  if(url.includes("https") || url.includes("http")){
    let rootDomain = getRootDomain(url)
    try{
      return "https://www.google.com/s2/favicons?domain="+rootDomain + "&sz=" + size;
    }catch(error){
      favicon = "public/defaultIcon.png";
    }
    
  }
  return favicon;

}


export async function updateEntry(entry:Object){
  let encryptedPassword = encrypt(entry.password);
  let passwordScore = getPasswordScore(entry.password)
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

  fetch("/api/entry/updateEntry",{
      method:"POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body:JSON.stringify(encryptedEntry)
    })
}



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

export async function getLeakedInfo(breachName:string):Promise<any>{
  let leakInfo = await fetch("/api/entry/leakDetails?name=" + breachName);
    if(leakInfo.status == 200){
      let leakInfoJson = await leakInfo.json();
      return leakInfoJson;
    }
    return {};
}


export async function checkExistingLeaked(entry:Object){

  let leaks = await checkLeaked(entry);
  if(leaks.length > 0){
    //Actualizar entry y cambiar estado a leaked
    if(entry.status[0] != "leaked"){
      entry.status[0] = "leaked";
      entry.leakInfo =  await getLeakedInfo(leaks[0]["Name"]);
      updateEntry(entry);
    }
    ////////////////////////////////////////////

  }

}


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

export function encrypt(value:any):string{

        let derivatedKey = sessionStorage.getItem("derivatedKey");
        const cipher = forge.cipher.createCipher('AES-CTR', forge.util.hexToBytes(derivatedKey!));
        cipher.start({iv:ivKey});
        cipher.update(forge.util.createBuffer(value));
        cipher.finish();
        return cipher.output.toHex();

}

export function decrypt(value:any, ivKey:any):string{
        let derivatedKey = sessionStorage.getItem("derivatedKey");
        const decipher = forge.cipher.createDecipher('AES-CTR', forge.util.hexToBytes(derivatedKey!));
        decipher.start({iv:ivKey});
        decipher.update(forge.util.createBuffer(forge.util.hexToBytes(value)));
        decipher.finish();
        return decipher.output.data;
}


export function getStatusCount(passwordEntries:any[]):Object{
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
    let dataObj = {
        safeCount: safePasswordCount,
        safePorcent: safePorcent,
        weakCount: weakPasswordCount,
        weakPorcent:weakPorcent,
        reusedCount: reusedPasswordCount,
        reusedPorcent:reusedPorcent,
        leakedCount: leakedPasswordCount,
        leakedPorcent:leakedPorcent,
    }

    return dataObj;


}
