const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors');
const { serialize } = require('v8');
const serialport = require('serialport');

const  {SerialPort}  = require('serialport');


let light;

let lightState=[]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    // res.status(200).send('sent from backend..........')
    res.sendFile(path.join(__dirname,'/webfile.html'))
})

app.get('/users',(req,res)=>{
    res.status(200).json({data:'this data is being sent from backend...'})
})

app.post('/light',(req,res)=>{
    const data = req.body
    light = data.lightCondition
    updateLightState()
    console.log(data.lightCondition)
    serialComArduino(light);
    res.status(200).send('data received....')
})

app.listen(7000,'onurled.vercel.app',()=>{
    console.log('listening on port 7000')
})

const port = new SerialPort({path: 'COM1', baudRate: 9600})

function serialComArduino(light){
    if(lightState[0]!=lightState[1]){
        port.write(light,function(err){
            if(err){console.log(err.message); 
            return;}
            console.log('Veri Algılandı')
        })        
    }
}

function updateLightState(){
    if(lightState[0]==undefined){
        lightState[1] = light
        lightState[0] = 1
    }
    else{
        lightState[0] = lightState[1]
        lightState[1] = light
    }
}

console.log('Merhaba')
