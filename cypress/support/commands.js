
var url = Cypress.env('url')
var username= 'nileshgajare@live.com'
var userPass = '123456'

//var username= 'administrator@starengineers.com'
//var userPass = '123456'
	
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-wait-until';
import 'cypress-iframe';


	Cypress.Commands.add('uploadFile', { prevSubject: true }, (subject, fileName) => {
      cy.fixture(fileName).then((content) => {
          const el = subject[0]
          const testFile = new File([content], fileName)
          const dataTransfer = new DataTransfer()

          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files
          cy.wrap(subject).trigger('change', { force: true })
      })
	})

	Cypress.Commands.overwrite('getCookies', () => {
		
		window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		//Cloud

		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','1P_JAR','ARRAffinity','XName','XUserId','ai_session')
		//ESS

		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_gcl_au')
		//Asure

		Cypress.Cookies.preserveOnce( 'ARRAffinity', '.AspNetCore.Session','.AspNetCore.Antiforgery.w5W7x28NAIs')
		//New ESS

		Cypress.Cookies.preserveOnce('EnterPriseCompanies', '.AspNetCore.Antiforgery.9fXoN5jHCXs', 'IsEnterPrise','cloudUsername','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXpEmail','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XSchemaName','XUserName','_ga','_gid','ai_user','new_username','GetLicenseData')
		
})

Cypress.Commands.add('getCookies_ESS', () => {
		
	window.console.log('Enter the beforeEach function')
	Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
	});
	
	//Cloud

	Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','1P_JAR','ARRAffinity','XName','XUserId','ai_session')
	//ESS

	Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_gcl_au')
	//Asure

	Cypress.Cookies.preserveOnce( 'ARRAffinity', '.AspNetCore.Session','.AspNetCore.Antiforgery.w5W7x28NAIs')
	//New ESS

	Cypress.Cookies.preserveOnce('EnterPriseCompanies', '.AspNetCore.Antiforgery.9fXoN5jHCXs', 'IsEnterPrise','cloudUsername','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXpEmail','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XSchemaName','XUserName','_ga','_gid','ai_user','new_username','GetLicenseData')
	Cypress.Cookies.preserveOnce('__utma', 'XNEmployeeCode','XNGender', 'XNcompanyName', 'XNESSRole', 'XNEmployeeId', 'XNEmployeeFullName', '__utmz',
	'PHPSESSID', '.AspNetCore.Antiforgery.9fXoN5jHCXs', 'XNPocketToken', '.AspNetCore.Session', 'ARRAffinitySameSite', 'XNCompanyId', 'XNSchemaName', 'ARRAffinity')

})

	Cypress.Commands.add('login', () => {
		cy.visit(url) 
		//cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		//cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		//cy.wait(2000)
})

	Cypress.Commands.add('changeCompany', () => {
	
	cy.readFile('cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
		//	D:/CypressPocketHRMS_ESS/cypress/fixtures			 	
		var company = entry.comapnayname	
	//cy.log('company '+ company)		
		//cy.wait(500)
		
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company.trim()){
				expect(text.trim()).to.eq(company.trim()) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				//cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				//cy.get('.radio:nth-child('+num1+') > label').click({force: true})
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company.trim()){
						expect(text).to.eq(company.trim())
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
						//cy.wait(2000)
					}	
				})
				})		
			}
		})
		
		})
	})
	
	//cy.visit('https://next.pockethrms.com/identity/Home/Dashboard')	
	//cy.wait(10000)	

})

Cypress.Commands.add('navigate_EmployeeProfile', (empID) => {
	cy.wait(1000)
	cy.get('#globalSearch').click({ force: true })
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(empID)
	cy.wait(5000)
	cy.contains('li', '('+empID+')').click({ force: true })
	cy.wait(3000)
})


Cypress.Commands.add('EssLogin', (empID, pwd) => {

	cy.visit(Cypress.env('essUrl'))

	cy.get("body").then($body => {
		if ($body.find('[onclick="return newSinIn()"]').length > 0) {
			cy.get('[onclick="return newSinIn()"]').click({ force: true })
		}
	});

	cy.readFile('cypress/fixtures/Company.json').then((text) => {
		text.forEach(function (entry) {

			var comapnaycode = entry.comapnaycode
			cy.log('comapnaycode ' + comapnaycode)



			cy.get('#CompanyCode').click({ force: true })
			cy.get('#CompanyCode').clear();
			cy.get('#CompanyCode').type(comapnaycode)


			cy.get('#EmployeeCode').click({ force: true })
			cy.get('#EmployeeCode').clear();
			cy.get('#EmployeeCode').type(empID)


			cy.get('#Password').click({ force: true })
			cy.get('#Password').clear();
			cy.get('#Password').type(pwd)


			cy.get('.btn').click({ force: true })

			cy.url().should('contains', '/Home/Dashboard');     

		})
	})

})







