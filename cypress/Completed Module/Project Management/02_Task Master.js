/// <reference types="Cypress" />
describe('02_Task Master', function () {
	var moment = require('moment');

	const { softAssert, softExpect } = chai;
	const Day =moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = Day2 + '/' + Month + '/' + year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var managerID = ''
	var managerName = ''
	var employeeID1 = ''
	var employeeName1 = ''
	var employeeID2 = ''
	var employeeName2 = ''

	var project = ''
	var project1 = ''
	var project2 = ''

	var task1 = ''
	var task2 = ''
	var task3 = ''	
	before(function () {
		
		cy.fixture('TestData/ProjectManagement').then(this, function (data) {
			this.data = data
			 managerID = this.data.managerID
			 managerName = this.data.managerName
			 employeeID1 = this.data.employeeID1
			 employeeName1 = this.data.employeeName1
			 employeeID2 = this.data.employeeID2
			 employeeName2 = this.data.employeeName2

			 project = this.data.project
			 project1 = this.data.project1
			 project2 = this.data.project2

			 task1 = this.data.task1
			 task2 = this.data.task2
			 task3 = this.data.task3
		})
	})


	beforeEach(function(){
		cy.getCookies()		
	})

	it('Login into Pocket ESS', function () {
		cy.EssLogin(managerID, managerID)
	})
	
	it('Navigate to Task Master', function() {	
		//cy.visit(Cypress.env('url')+'Timesheet/Transaction/TimesheetRequest?Menu=ProjectMaster')
		//cy.wait(2000)	
		cy.xpath("//table[contains(@onclick,'Project')]").click({force: true})
		cy.wait(500)
		cy.get('[data-link="/ProjectManagement/Transaction/ProjectMaster"]').click({force: true})
		cy.wait(500)
		cy.get('#TravelReimbursementDetail').click({force: true})
		cy.wait(1000)
	})

	
	it('Verify Validation Massges - Please Enter Task Name.', function() {	
		
			cy.get('#btnOpenForm').click({force: true})	
	
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please Enter Task Name.');
		  })
		  	
			  		  
	})
	
	it('Save Task Deatils & Verify Message - Record save successfully', function() {
		cy.get('#Name').click({force: true})
			cy.get('#Name').type(task1)	
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		cy.get(".noty_body").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains('Record save successfully');
		 })		  		  
	})
	
	it('Verify Task Details', function() {	
			cy.wait(1000)
			cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task1)
			{
			 softExpect(text.trim()).to.eq(task1);	
			
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('');				
		})
	
		}			 
		})
		})
			
			
	})

	it('Verify Validation Massges - Duplicate Task Name. Please Enter Another Task Name', function() {
		cy.get('#btnOpenForm').click({force: true})	
		cy.get('#Name').click({force: true})
			cy.get('#Name').type(task1)	
		cy.get('#btnSave').click({force: true})
	
		cy.get(".noty_body").invoke('text').then((text) => {
		softExpect(text.trim()).to.contains('Duplicate Task Name. Please Enter Another Task Name');
		 })		  		  
	})
	
	it('Add Task Deatils with all details', function () {	
		cy.get('#Name').clear().click();
		cy.get('#Name').type(task2);
		cy.wait(1000)
		cy.get('.trumbowyg-editor').type('Testing '+task2)
		cy.wait(1000)

		cy.get('#btnSave').click({ force: true })
		cy.url().should('contains', 'ProjectManagement/Transaction/ProjectMaster?Menu=TaskMaster');
		cy.wait(1000)
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Record save successfully');
		})

	})

	it('Verify Task Details with all details', function() {	
		cy.wait(1000)
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
		var num = parseFloat(i)
		//cy.wait(2000)	
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
		cy.log(text.trim())
		if (text.trim() == task2)
		{
		 softExpect(text.trim()).to.eq(task2);	
		
	
	cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
		cy.log(text.trim())
		 softExpect(text.trim()).to.eq('Testing '+task2);				
	})

	}			 
	})
	})
		
		
})

	it('Edit Task Deatils & Verify Message - Record Update successfully', function() {	
		
			cy.wait(1000)
			cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task2)
			{
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(3)>button[id="Edit"]').eq(num).click({force: true})
			cy.get('#Name').click({force: true})
			cy.get('#Name').clear().type(task3)
			
			cy.get('[class="trumbowyg-editor"]').click({force: true})
			cy.get('[class="trumbowyg-editor"]').clear().type('Demo of '+task3)
			
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Record Update successfully');
		  })
		}
		})
		})			
	})
	
	it('Verify Task Details', function() {	
		
		  cy.wait(1000)
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task3)
			{
			 softExpect(text.trim()).to.eq(task3);	
			
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('Demo of '+task3);				
		})
		
		}			 
		})
		})
	})

	it('Delete Task Deatils', function () {
		cy.wait(1000)
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task1)
			{
			 softExpect(text.trim()).to.eq(task1);	
			
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(3) >button:nth-child(2)').eq(num).click()

		
		}			 
		})
		})
			

		
	})

})
	