describe('04_Emp Wizard', function () {


    var empid;
    var Staff = 'Staff'
    var ESILocation = 'Pune'
    var ESIDispensary = 'Mumbai'

    var EmpName = 'Ratan'
    var LastName = 'Rao'
    var PtLocation = 'Maharashtra'
    var DateOfBirth = '01/12/1995'
    var DateOfJoining = '02/04/2018'
    var Metro = 'Metro'


    before(() => {
        cy.task('readXlsx', { file: 'cypress/fixtures/Employee/New Employee.xlsx', sheet: "New Employee" }).then((rows) => {
            var rowsLength = rows.length;
            cy.writeFile("cypress/fixtures/Employee/New Employee.json", { rows })
        })
    })

    beforeEach(function () {
        cy.getCookies()
    })

    it('Login to Cloud & select Company', function () {
        cy.login()
        cy.changeCompany();
    })
    /*
    it('Add Employee', function() {
   
              cy.visit(Cypress.env('url')+'/Employee/Employee/EmployeeList')
   
              cy.wait(2000)
             // cy.xpath("//label[contains(text(),'Employee Wizard')]").click()
           
           cy.fixture('/Employee/New Employee').then((excelData) => {
           excelData.rows.forEach((data, index) => {
   
           cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
           cy.wait(2000)
                     
           cy.get('input[name=code]').type(data.EmpID.trim())
            
           cy.get('input[name=fname]').type(data.FirstName.trim())
        
           cy.get('input[name=lname]').type(data.LastName.trim())
        
           
           cy.get('#Male').check(data.Gender,{force: true})
           
           cy.get('select[name=category]').select(data.Category,{force: true})
        
           cy.get('select[name=ptlocation]').select(data.ProfTaxLocation)
        
        
          cy.get('#txt_dateofbirth').click().then(input => {
             input[0].dispatchEvent(new Event('input', { bubbles: true }))
              input.val(data.DateOfBirth)
         })
        
        
          cy.get('#txt_dateofjoining').then(input => {
                  input.val(data.DateOfJoining)
          }) 
        
          //cy.wait(1000)
          cy.get('[for="Date of Joining"]').click()
          cy.wait
          cy.get('select[name=esilocation]').select(data.ESILocation,{force: true})
          cy.get('select[name=metro]').select(data.Metro_TDS,{force: true})
          cy.get('select[name=esidispensary]').select(data.ESIDispensary,{force: true})
         // cy.wait(1000)
          cy.get('#btnSaveBasicDetail').click({force: true})
   
          cy.wait(2000)
           //cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
          cy.get(".toast-message").invoke('text').then((text) => {
              expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
              cy.log(text.trim())
          })  
          cy.get(".toast-message").click({force: true})
   
          cy.get('[class="close"]').eq(0).click()
          cy.wait(2000)
            
               })
           })
    })
   */

    it('Add Selfservice role', function () {
        var carts = [];

        const filename = 'cypress/fixtures/Password.json'
        cy.writeFile(filename, [{ EmployeeId: '', Password: '' }])

        cy.fixture('/Employee/New Employee').then((excelData) => {
            excelData.rows.forEach((data, index) => {
                cy.wait(1000)
                cy.navigate_EmployeeProfile(data.EmpID)
                cy.wait(1000)
                cy.get('#profile_detail_tab').click({ force: true })
                cy.get('#Profile_SelfServiceRole').click({ force: true })
                cy.get('#Profile_SelfServiceRole').click()
                cy.get('#Profile_SelfServiceRole').click({ force: true })
                cy.wait(2000)
                cy.get('[name="SelfServiceRole"]').select(data.Selfservicerole, { force: true })
                cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
                cy.wait(2000)
                let map = new Map();

                cy.get("#credentials").invoke('text').then((text) => {
                    var str = text;
                    var pass = text.substr(10).trim()
                    cy.log("pass", pass)

                    cy.readFile(filename).then((list) => {
                        list.push({ EmployeeId: data.EmpID, Password: pass })
                        cy.writeFile(filename, list)
                    })


                    // cy.writeFileSync(filename, data.rows[index].{ name: text })
                })



            })
        })
        // cy.writeFile('cypress/fixtures/Password.json', carts)


    })


    /*it('Add Selfservice role', function () {
        var carts = [];
    
     /*   cy.fixture('Password.json').then((excelData) => {
            excelData.rows.forEach((data, index) => {
                cy.wait(1000)
                cy.log("Data_"+index, data.Password)
               // cy.navigate_EmployeeProfile(data.EmpID)
    
            })
        })
    
    const filename = 'cypress/fixtures/Password.json'
    cy.writeFile(filename, [{ name: 'Joe' }])
    // let's add another person
    cy.readFile(filename).then((people) => {
      people.push({ name: 'Mike' })
      // write the merged list
      cy.writeFile(filename, people)
    })
    
    
    })
    */
    /*
    
        it('Assign Manager from Approval Matrix ', () => {
            //		cy.login()
            //cy.changeCompany();
            var filePath = 'New Employee.xlsx'
            var sheetName = 'ApprovalMatrix'
    
            cy.task('readXlsx', { file: 'cypress/fixtures/Employee/' + filePath, sheet: sheetName }).then((rows) => {
                var rowsLength = rows.length;
                cy.writeFile('cypress/fixtures/' + sheetName + ".json", { rows })
            })
    
            cy.fixture(sheetName).then((excelData) => {
                excelData.rows.forEach((data, index) => {
                    cy.navigate_EmployeeProfile(data.EmployeeCode)
    
                    cy.wait(2000)
                    cy.get('#approval_matrix_tab').click({ force: true })
                    cy.wait(2000)
    
    
                    if (data.Priority == 1) {
                        cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
                    }
                    else {
                        cy.get('#approvalComponentTitle > .row > .col-8 > [onclick=""] > .fas').click({ force: true })
                        cy.wait(2000)
                    }
    
                    cy.get('#Priority').click({ force: true })
                    cy.get('#Priority').clear().type(data.Priority)
    
                    cy.wait(2000)
                    cy.get('#select2-approvalManager-container').click({ force: true })
                    cy.wait(2000)
                    cy.get('input[type="search"]').click({ force: true })
                    cy.get('input[type="search"]').type(data.LeaderCode)
                    cy.wait(2000)
                    cy.contains('li', '[' + data.LeaderCode + ']').click({ force: true })
                    //cy.get('.select2-results__option--highlighted').click({ force: true })
                    cy.wait(2000)
    
                    if (data.ApprovalMust != '') {
                        cy.get('#approvalmust').select('Yes')
                    }
    
                    if (data.ApprovedCancelRights != '') {
                        cy.get('#cancelrights').select('Yes')
                    }
    
                    //cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
                    cy.get('#' + data.ModuleName + '').click({ force: true })
                    //cy.xpath("//label[contains(text(),'On Duty')]").click()
                    cy.get('#btnSaveText').click()
                    cy.wait(2000)
    
    
                })
            })
    
    
        })
    
        it ('Add Leave Balance ',() => {
    
            var leave = 'Paid Leave'
            var employeeID = 'lv1'
    
            cy.navigate_EmployeeProfile(employeeID)	
            cy.wait(2000)
            cy.get('#leave_detail_tab').click({force:true});
                cy.wait(2000)
                
                cy.get('#Leave_LeaveEntry').click({force:true})
                cy.wait(3000)
        
                const { softAssert, softExpect } = chai;
                
            //cy.navigate_EmployeeLeave()	
            
        
                cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
                var num = parseFloat(i+1)
                cy.log("num: "+num)
                
                cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
                cy.log("text: "+text)
                    if(text.trim()==leave){
                        expect(text).to.eq(leave)
                
            
                cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
                cy.log("availableLeave: "+availableLeave)
                
                cy.log("i: "+i)
                    if(availableLeave.trim() =='0'){
                    cy.get(':nth-child(2) > .card > .card-body > .float-right > a > .fas').click()
        
                    //cy.get('.fa-ellipsis-v').eq(i-1).click()
                    
                    cy.get('#LeaveOpen').click({force: true})
                    cy.get('#LeaveOpen').clear()
                    cy.get('#LeaveOpen').type('10');
                    
                    cy.get('#saveloader').click({force: true})
                    cy.wait(8000)	
                    }
        
                })
            }
            })
        })
        
        })*/
})
