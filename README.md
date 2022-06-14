# CounterBot

CounterBot is a NodeJs Bot used to display the number of people on the discord server

## Installation

Create a new application on discord developper. Then create a new bot and give him Privileged Gateway Intents in the section Bot.
- PRESENCE INTENT 
- SERVER MEMBERS INTENT

## Usage

In the config.json put the TOKEN of your application, the ID of the bot and the ID of your server. For this you must activate the developer mode on discord in order to be able to recover the IDs.

config.json : 
```json
{
    "TOKEN":"UR TOKEN",
    "KEY":"ID BOT",
    "ID_SERVER": "ID SERVER"
}
```
All types :
- members : All members will be counted , if countBot true , Bots will also be counted
- online : All members online will be counted , if countBot true , Bots will also be counted
- offline : All members offline will be counted , if countBot true , Bots will also be counted
- idle : All members idle will be counted , if countBot true , Bots will also be counted
- dnd : All members dnd ( Do not disturb ) will be counted , if countBot true , Bots will also be counted
- bot : All Bots will be counted

Parameter :
- name : Display name of the channel , {count} will be replaced by the count , don't delete {count}
- ID : ID of the channel ( Need to be a channel voice )
- type : You can give multiple type you want
- countBot : if true , Bots will also be counted

channels.json :
```json
[
    {
        "name": "MEMBRES | {count} 😻",
        "ID": "985930005643161660",
        "type": ["members"],
        "countBot": false
    },
    {
        "name": "EN LIGNE | {count} 😻",
        "ID": "985940682759897119",
        "type": ["online", "dnd"],
        "countBot": false
    },
    {
        "name": "HORS LIGNE | {count} 😻",
        "ID": "985940718520508467",
        "type": ["offline", "idle"],
        "countBot": false
    },
    {
        "name": "ROLESBOT | {count} 😻",
        "ID": "986341145888030720",
        "type": ["roles"],
        "ID_ROLES": ["986350641968447528"],
        "countBot": true
    }
    ,
    {
        "name": "Nombre de bot | {count} 😻",
        "ID": "986341145888030720",
        "type": ["bot"],
        "ID_ROLES": ["986350641968447528"],
        "countBot": true
    }
]
```

## Contributing
Thanks for using my code. Please don't sell it, I did it for free, give away for free.

My Discord : Kevin#6537