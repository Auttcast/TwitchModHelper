// npx ts-node .\main.ts  

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.on('line', () => {
    console.clear();
});

console.log('Press Enter to clear the console.');

const tmi = require('tmi.js');

//the client will use an anonymous connection to chat
const client = new tmi.Client({
	channels: [ 'ramez05' ]
});

client.connect();

let dict: Record<string, string> = {};

function GetLogDate(): string
{
    const currentTime = new Date();

    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1; // Months are zero-based (January is 0)
    const day = currentTime.getDate();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    // Format as a readable string
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime;
}

client.on('message', (channel:string, tags:any, message:string, self:any) => {
    let name:string = tags['display-name'];
	
    if (name in dict) return;

    dict[name] = "";

    console.log(`${GetLogDate()} GREET ${name}`);
});
