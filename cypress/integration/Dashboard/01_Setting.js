describe('01_Setting', function () {

    
    var esiLocation = ['Pune']
    var esiDispensary = ['Pune', 'Mumbai']
    var department = ['IT', 'HR']
    var designation = ['Manager', 'HR']

    function Randomcomapnyname(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return 'Test_' + result;
    }

    function companycode(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function AddCategory(Category) {
        cy.server()
        cy.route('GET', Cypress.env('url') + 'Payroll/Settings/getCategoryWiseEmployeeCount').as('addCategory')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=category')

        //	cy.get('#HR_Category').click()
        cy.get('[title="Add Category"]').eq(0).click({ force: true })

        cy.get("#categoryModalLabel").then(($span) => {
            var catagoryheadertex = $span.text();
            expect(catagoryheadertex).to.have.string('New Category')
        })
        cy.get('#categoryName').should('be.visible').should('not.disabled')
        cy.get('#categoryName').should('exist')

        cy.get('#description').should('be.visible').should('not.disabled')
        cy.get('#description').should('exist')

        cy.get('#displayOrder').should('be.visible').should('not.disabled')
        cy.get('#displayOrder').should('exist')

        cy.get('#categoryName').click()
        cy.get('#categoryName').type(Category)

        cy.get('#description').click()
        cy.get('#description').type(Category)


        cy.get('#displayOrder').click()
        cy.get('#displayOrder').type('1')

        cy.get('#createBtn').click()
        cy.wait(1000)

        cy.wait('@addCategory').its('status').should('eq', 200)

        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Category added successfully.!')
        })

        cy.get(".toast-message").click()

        cy.get('.accordion > .card > .card-body').contains(Category)

    }



    function navigatePopupData(Component, Data) {
        cy.server()
        cy.route('GET', '/Payroll/Settings/getPopUpData?tableName=').as('loadPopupComponant')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=popup')
        cy.get('#HR_PopUpData').click()

        cy.wait('@loadPopupComponant').its('status').should('eq', 200)

    }
    function AddPopupdata(Component, Data) {

        navigatePopupData()
        cy.wait(2000)
        //var comp = Component.replaceAll(' ', '')
        //cy.server()
        //cy.route('POST', '/Payroll/Settings/SavePopupData?fieldname='+comp.toUpperCase()+'&popupValue='+Data.toUpperCase()+'&Id=').as('getPopupdata')

        cy.get('#metadatatable').select(Component)
        cy.get('[title="Add Popup"]').eq(0).click()

        cy.get('#popupvalue').click()
        cy.get('#popupvalue').type(Data)
        cy.get('[onclick="submitData()"]').click()
        //cy.wait(1000)
        //cy.wait('@getPopupdata').its('status').should('eq', 200) 

        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data Saved Successfully')
        })
        cy.get(".toast-message").click()
        cy.wait(2000)
        cy.get('#metadatatable').select(Component)
        cy.get('#popUpDataForm').contains(Data)
        cy.wait(1000)

    }

    beforeEach(function () {
        cy.getCookies()
    })

    it('Login to Cloud', function () {
        cy.login()
    })

  /*  it('Add Company', function () {
        cy.server()

        cy.route('POST', Cypress.env('url') + 'Admin/Company/Index').as('companycreate')

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=companyprofile')

        cy.get('[title="Add New Company"]').eq(0).click({ force: true })

        var companyText = Randomcomapnyname(5);
        var SelfservicecodeText = companycode(5);
        cy.writeFile('cypress/fixtures/Company.json', [{ "comapnayname": companyText, "comapnaycode": SelfservicecodeText }])

        cy.get('#txtname').type(companyText)
        cy.get('#txtcompanycode').type(SelfservicecodeText)

        cy.get('#SubmitBtn').click({ force: true })
        cy.wait('@companycreate').its('status').should('eq', 200)
        cy.wait(5000)


    })
*/
    it('add Category - staff', function () {
        AddCategory('Staff')
    })
})

