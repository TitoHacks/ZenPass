class Entry{
    _id: string | undefined;
    title: string | undefined;
    username: string | undefined;
    password: string | undefined;
    url: string | undefined;
    score: string | undefined;
    status: string | undefined;
    isWeb: string | undefined;
    ownerId: string | undefined;
    iv: string | undefined;
    leakInfo: {
        Name: string;
        Title: string;
        Domain: string;
        BreachDate: string;
        AddedDate: string;
        ModifiedDate: string;
        PwnCount: number;
        Description: string;
        LogoPath: string;
        DataClasses:Array<String>;
        IsVerified:boolean;
        IsFabricated:boolean;
        IsSensitive:boolean;
        IsRetired:boolean;
        IsSpamList:boolean;
        IsMalware:boolean;
        IsSubscriptionFree:boolean;
    } | undefined;
    __v:number | undefined;


    *[Symbol.iterator]() {
        const properties = Object.entries(this); // Obtener todas las propiedades de la instancia como un array de pares [clave, valor]
        for (const [key, value] of properties) {
            // Omitir propiedades especiales como _id, __v, etc.
            if (key !== '_id' && key !== '__v' && key !== 'leakInfo') {
                yield value; // Devolver el valor de cada propiedad
            }
        }
    }

}