// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/*module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.timeout = 10000
}
*/
//var imports = new JavaImporter(java.io, java.lang, org.sikuli.script, org.sikuli.natives, org.junit);
//from sikuli import *
//import Package(java.io);
//require('sikuli')
//{Screen} = require "sikuli"
//require('node-sikuli-master')
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
 /// <reference types="@shelex/cypress-allure-plugin" />
 const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on, config) => {
    allureWriter(on, config);
    return config;
};
 
module.exports = (on, config) => {

}



// <reference types="Cypress" />
const debug = require("debug");
const path = require("path");
const gmail_tester = require("gmail-tester");


const fs = require('fs')
const pdf = require('pdf-parse');
const crypto = require('crypto');
const {GoogleSocialLogin} = require('cypress-social-logins').plugins

const repoRoot = path.join(__dirname, '..', '..') // assumes pdf at project root

const parsePdf = async (pdfName) => {
  //const pdfPathname = path.join(repoRoot, pdfName)
  // const pdfPathname = path.join(pdfName)
   //console.log("pdfPathname: "+pdfPathname)
  let dataBuffer = fs.readFile(pdfName);
  return await pdf(dataBuffer)  // use async/await since pdf returns a promise 
}

/*module.exports = (on, config) => {
  on('task', {
    getPdfContent (pdfName) {
      return String(parsePdf(pdfName))
    }
  })
}
*/
PDFParser = require("pdf2json");

  
 
function getPdfContent (fileName) {
	 fs.readFile(fileName, (err, pdfBuffer) => {
      if (!err) {
        return pdfParser.parseBuffer(pdfBuffer);
      }
    })
    }

	
//Get data from Excel to Json
'use strict';
var excelToJson = require('convert-excel-to-json');
//const fs = require('fs')


function getFileTextData(fileName){
	
    const result = excelToJson({
	sourceFile: fileName,
/*	sheets: [
	{
		name: 'BirthDay',
	    range: 'A4:C5'
	}],
	columnToKey: {
		A: 'EmployeeCode',
		B: 'EmployeeName',
		C: 'DateOfBirth'
	}
	*/
	//sourceFile: data	
});

console.log("File Parsed Successfully");
console.log(result);
		
return result;

};


function getFileChecksum(file){
    return crypto
			.createHash('md5')
        .update(file, 'utf8')
        .digest('hex');
};

const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')



const readXlsx = require('./read-xlsx')

	module.exports = (on, config) => {
  on('task', {

    downloadFile,
    
    'readXlsx': readXlsx.read,
	  
    parseXlsx({ filePath }) 
    { return new Promise((resolve, reject) =>
      { try 
       {
          const jsonData = xlsx.parse(fs.readFileSync(filePath)); 
          resolve(jsonData);
          } catch (e) 
          {
             reject(e);
          } });
      
        },
    generateOTP: require("cypress-otp")
,
  
   "gmail:get-messages": async args => {
      const messages = await gmail_tester.get_messages(
        path.resolve(__dirname, "credentials.json"),
        path.resolve(__dirname, "token.json"),
        args.options
      );
      return messages;
    },
	
	downloadFile(){
		return null;
	},		
	
	convertExcelToJson_CurrentFile({file, fileName}) {  
	var content = "{"+ JSON.stringify(getFileTextData(fileName))+"},\n";
	//fs.appendFileSync('D:/CypressPocketHRMS/cypress/downloads/'+file+'.txt', content);
  fs.appendFileSync('cypress/downloads/'+file+'.txt', content);
 // fs.appendFileSync('D:/CypressPocketHRMS/cypress/fixtures/'+file+'.txt', content);
	console.log("File Parsed Successfully");
	console.log("content: "+content);
      return content;
  },
	
	convertExcelToJson_ExitingFile({file, fileName}) {
	
	var content = "{"+ JSON.stringify(getFileTextData(fileName))+"},\n";
	fs.appendFileSync('D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\'+file+'.txt', content);
	console.log("File Parsed Successfully");
	console.log("content: "+content);
      return content;
    },
	
	convertPDFToJson_CurrentFile({file, fileName}) { 
	let pdfParser = new PDFParser(this,1);
	
	pdfParser.loadPDF(fileName);	
    pdfParser.on("pdfParser_dataReady", pdfData => {
	let content = 	pdfParser.getRawTextContent()
    fs.writeFile('D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\'+file+'.txt', content);	
    });
	return null;
    },
	
	convertPDFToJson_ExitingFile({file, fileName}) {
	let pdfParser = new PDFParser(this,1);

	pdfParser.loadPDF(fileName);			
    pdfParser.on("pdfParser_dataReady", pdfData => {
	let content = 	pdfParser.getRawTextContent()	
    fs.writeFile('D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\'+file+'.txt', content);
	
	
    });
	return null;

    },
	

	getFileChecksum_CurrentJson({file}) {  
	var content = getFileChecksum(file);
	console.log("File Parsed Successfully");
	console.log("content: "+content);
      return content;
    },
	
	getFileChecksum_ExitingJson({file}) {  
	var content = getFileChecksum(file);
	console.log("File Parsed Successfully");
	console.log("content: "+content);
      return content;
    },
	
	deleteFile({fileName}) {  
	fs.unlinkSync(fileName);
	return null;
    },
	
	
	downloadFile1() {  
	with (imports) {
    var path = "/Users/dave/IdeaProjects/Sikuli/images/";
    var eight = path + "eight.png";
    var multiply = path + "multiply.png";
    var five = path + "five.png";
    var three = path + "three.png";
    var equals = path + "equals.png";
    var result = path + "result.png";

    var Screen = Java.type("org.sikuli.script.Screen");
    var App = Java.type("org.sikuli.script.App");
    var MacUtil = Java.type("org.sikuli.natives.MacUtil");
    var Assert = Java.type("org.junit.Assert");

    var s = new Screen();
    var a = new App();
    var mu = new MacUtil();

    a.setName("Calculator");

    mu.open(a);

    s.click(eight);
    s.click(multiply);
    s.click(three);
    s.click(equals);
    Assert.assertNotNull("The Image is not Correct", s.exists(result));
}
	return null;
    },
	
	
	
	//GoogleSocialLogin(){
	//	GoogleSocialLogin: GoogleSocialLogin
	//	return GoogleSocialLogin;
	//},		

	
		GoogleSocialLogin: GoogleSocialLogin
		
    

  })



}


// const readXlsx = require('./read-xlsx')

// module.exports = (on, config) => {
//   on('task', {
//     'readXlsx': readXlsx.read
//   })
// }

 