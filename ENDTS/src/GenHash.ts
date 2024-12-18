export function generateHash(desiredLength: number): string {
    const sourceString = "abhskdfa;sjlfaelkwrvda;kjfa10230nfekfldskf;ajfdasflv;akdfda";
    const sourceLength = sourceString.length;
    let hash = "";

    for (let i = 0; i < desiredLength; i++) {
        hash += sourceString[Math.floor(Math.random() * sourceLength)];
    }

    console.log(hash);
    return hash;
}
