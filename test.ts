import axios from "axios";
import * as cheerio from "cheerio"

function costumeFilter(property: any) {
    const newArray = []
    for (let i = 0; i<property.length; i++) {
        if (property[i].attribs.alt.include("本土")) {
            newArray.push(property[i])
        }
    }
    return newArray
}

axios("https://www.gvm.com.tw/category/news")
                .then(async response => {
                const $ = cheerio.load(response.data)

                $(".article-list").each((i, element) => {
                    const result = $(element).find("img")
                    const link = []

                    for (let i = 0; i<result.length; i++) {
                        if (result[i].attribs.alt.includes("本土")) {
                            link.push(result[i])
                        }
                    }
                    let string = JSON.stringify(link[0].attribs)
                    console.log(string.split(`"`)[15])
                    //console.log(element) $(element).find("img"
                    
                })
            })