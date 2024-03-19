import bcrypt from 'bcryptjs';
import forge from 'node-forge';
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


export function storeDerivateKey(originalPassword:string, salt:string, iterations:number){
    const KEY_LENGTH = 32;
     forge.pkcs5.pbkdf2(originalPassword,salt,iterations,KEY_LENGTH,'sha512',(err, derivedKey) => {
        if (err) {
            console.error("Error al derivar la clave:", err);
            return;
        }

        sessionStorage.setItem("derivatedKey",forge.util.bytesToHex(derivedKey));
    });
}