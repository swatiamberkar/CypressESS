
describe('Task - Project Mapping', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	var project = 'PR-1'
	var project1 = 'PR-2'
	var task = 'Development'
	var task1 = 'Testing'

		
	
		
	beforeEach(function(){
        cy.getCookies()
	})
   
	
	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Add Configuration Fields - Project', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=hr&submodule=customfields')
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').type('PROJECT')

		cy.get('#labelName').click({ force: true })
		cy.get('#labelName').type('PROJECT')

		cy.xpath("//input[@name='FieldSize']").click({ force: true })
		cy.xpath("//input[@name='FieldSize']").clear().type('30')

		cy.get('[name="CellType"]').select('Pop-Up', { force: true })

		cy.xpath("//select[@name='Panel']").select('Employee',{force: true})

		cy.get('#Filter').click({force: true})

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		})

	})

	it('Add Configuration Fields - Task', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=hr&submodule=customfields')
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').type('TASK')

		cy.get('#labelName').click({ force: true })
		cy.get('#labelName').type('TASK')

		cy.xpath("//input[@name='FieldSize']").click({ force: true })
		cy.xpath("//input[@name='FieldSize']").clear().type('100')

		cy.get('[name="CellType"]').select('Pop-Up', { force: true })

		cy.xpath("//select[@name='Panel']").select('Custom', { force: true })

		//cy.get('#Filter').click({ force: true })

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		})

	})

	it('Add Project', function () {
		cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=hr&submodule=popup')
		cy.wait(3000)
		cy.get("#metadatatable").select('PROJECT', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })

		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(project)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

		cy.get("#metadatatable").select('Project', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })



		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(project1)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

	})

	it('Add Task', function () {
		//cy.visit(Cypress.env('cloudUrl') + 'Settings/Employee/Index?module=hr&submodule=popup')
		cy.wait(3000)
		cy.get("#metadatatable").select('TASK', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })

		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(task)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

		cy.get("#metadatatable").select('Task', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })



		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(task1)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

	})
	

})
	