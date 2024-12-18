"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
function generateHash(desiredLength) {
    const sourceString = "abhskdfa;sjlfaelkwrvda;kjfa10230nfekfldskf;ajfdasflv;akdfda";
    const sourceLength = sourceString.length;
    let hash = "";
    for (let i = 0; i < desiredLength; i++) {
        hash += sourceString[Math.floor(Math.random() * sourceLength)];
    }
    console.log(hash);
    return hash;
}
