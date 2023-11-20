const puppeteer = require('puppeteer')
const express = require('express')
const db = require('../src/db.json')
const fs = require('fs')
const url = 'https://neoxscan.net/'
 
const server = express()
let mangas = []
server.get('/', (req, res) => {

    res.send(db.forEach(function(element){return element}))

})
server.listen(8080, () => {
    

    const mangaPage = async () => {
        fs.writeFile('../src/db.json', JSON.stringify({}, null, 2), err => {
            if (err) return err
        })
        const browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport:null
        })
        const page = await browser.newPage()

        await page.goto(url,{
            waitUntil:"domcontentloaded"
        })
 
            await page.waitForSelector('.larger')


            const LinksPages = await page.$$eval('.larger',el => el.map(link =>link.href))
            
            for(const link of LinksPages){

                await page.goto(link,{
                    waitUntil:"domcontentloaded"
                })

                await page.waitForSelector('.page')

                let list = await page.evaluate(()=>{

                
                    const pageItens = document.querySelectorAll(".page-item-detail")
                        return Array.from(pageItens).map((manga) =>{
        
                            const Image = manga.querySelector('a > img').getAttribute('src')
                            const Name = manga.querySelector('.h5').innerText
                            const Chapter = manga.querySelector('.chapter').innerText
                            const Link = manga.querySelector('.chapter > a').getAttribute('href')
                            
                            return {Image,Name,Chapter,Link}

                           
                            
                        })                      
                       
                        
                })  
           
                mangas.push(list)       

            }
            fs.writeFile('../src/db.json', JSON.stringify(mangas, null, 2), err => {
                if (err) return err
            })
            
            
              
       
        await browser.close()
        
    }
    
   
    
    mangaPage()
})

