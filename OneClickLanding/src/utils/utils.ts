import bcrypt from 'bcryptjs';
import forge from 'node-forge';
import { passwordStrength } from 'check-password-strength'

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


export function generateStatus(encryptedPassword:string, passwordStatus:string):any[]{

    let estados:any[] = [];
    //Mirar si es contraseña reutilizada;
    fetch("/api/entry/isReused?=" + encryptedPassword ,{
        method:"GET"
    }).then(response => response.json()).then(data=>{
        if(data["reused"]){
            estados.push("reused");
        }
    })

    if(passwordStatus == "Weak" || passwordStatus == "Too weak"){
        estados.push("weak");
    }




    //Mirar si la contraseña esta filtrada


    


    if(estados.length == 0){
        estados.push("safe");
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

    let encryptedPassword = encrypt(values["password"]);
    let passwordScore = getPasswordScore(values["password"])
    let estados = await generateStatus(encryptedPassword,passwordScore);
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
    }

    fetch("/api/entry/newEntry",{
        method:"POST",
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body:JSON.stringify(encryptedEntry)
      })


}


export async function getEntries():Promise<any[]>{

    let decryptedEntries:any[] = [];

    await fetch("/api/entry/getEntries?passnovaUID=" + sessionStorage.getItem("PassnovaUID"),{
        method:"get",

      }).then(response => response.json()).then(data=>{
        for(let i = 0; i < data.length; i++){
            let iv = data[i]["iv"];
            let originalIV = forge.util.hexToBytes(iv);
            let entryObj = {
                _id: data[i]["_id"],
                __v: data[i]["__v"],
                title: decrypt(data[i]["title"],originalIV),
                username: decrypt(data[i]["username"],originalIV),
                password: decrypt(data[i]["password"],originalIV),
                url: decrypt(data[i]["url"],originalIV),
                score: data[i]["score"],
                isWeb: data[i]["isWeb"],
                status: data[i]["status"],
                iv:iv,
            }
            decryptedEntries.push(entryObj);
        }
        
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