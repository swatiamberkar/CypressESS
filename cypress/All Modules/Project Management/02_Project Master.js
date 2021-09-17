/// <reference types="Cypress" />

// type definitions for Cypress object "cy"
// <reference types="cypress" />
//import ProjectManagement from 'D:\\CypressESS\\cypress\\fixtures\\ProjectManagement.json'
//module.exports.data = 'module data';


describe('02_Project Master', function () {
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

	var task = 'Task-1'
	var task2 = 'Task-2'

	var description = 'Testing of Task-1'
	var estimatedTime = '150'
	var startDate = '01/05/2021'
	var endDate = '31/05/2021'


	var description2 = 'Testing of Task-2'
	var estimatedTime2 = '200'
	var startDate2 = '01/06/2021'
	var endDate2 = '31/06/2021'
	var priority = 'High'
	var file = 'VaccineInfo.pdf';

	
		

	before(function () {
		
		cy.fixture('ProjectManagement').then(this, function (data) {
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
		})
	})


	beforeEach(function(){
		//cy.getCookies()		
	})

	
	it('Login into Pocket ESS', function () {
		cy.EssLogin(managerID, managerID)
	})
	
	it('Navigate to Project Master', function() {	
		//cy.visit(Cypress.env('url')+'Timesheet/Transaction/TimesheetRequest?Menu=ProjectMaster')
		//cy.wait(2000)	
		cy.xpath("//table[contains(@onclick,'Project')]").click({force: true})
		cy.wait(500)
		cy.get('[data-link="/ProjectManagement/Transaction/ProjectManagementRequest"').click({force: true})
		cy.wait(500)
		cy.get('#ProjectMaster').click({force: true})
		cy.wait(5000)
	})
		
	it('Verify Validation Messages - Please Enter Project Name.', function() {	
		cy.get('#btnOpenForm').click()
		cy.wait(5000)
		cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Project Name.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})

	it('Verify Project Details Mandatory Fields', function() {	
	
		cy.get('#txtName').click({force: true})
		cy.get('#txtName').clear().type(project);
		 //cy.wait(2000)
		 
		
		cy.get('#btnSave').click({force: true})	
	
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Records Saved Successfully.!');
			cy.get(".noty_body").click({ force: true })
		  })
	
		  cy.wait(5000)
		cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
				if (text.trim() == project)
			{
				softExpect(text.trim()).to.eq(project);	
			
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('On Track');				
		})
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(5)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		}			 
		})
		})
			
			
	})

	it('Verify Validation Messages - Duplicate Project Name. Please Enter Another Project Name', function() {	
		
		cy.get('#btnOpenForm').click({force: true})
		cy.get('#txtName').click({force: true})
		cy.get('#txtName').clear().type(project);
		//cy.wait(2000)
		cy.get('#btnSave').click({force: true})
		cy.wait(500)
		cy.get(".noty_body").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Duplicate Project Name. Please Enter Another Project Name');
		cy.wait(500)
		cy.get(".noty_body").click({force: true})
		})	  		  
	})

	it('Save Project Details with all fields', function() {	
	
		cy.get('#btnOpenForm').click({force: true})
		
		cy.get('#txtName').click({force: true})
		cy.get('#txtName').clear().type(project1);
		//cy.wait(2000)
		cy.get('#txtCode').click({force: true})
		cy.get('#txtCode').clear().type('P1');
		//cy.wait(2000)
		cy.get('#StartDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/06/2021')
			})
		cy.get('#EndDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('30/06/2021')
			})	
		cy.get('[class="trumbowyg-editor"]').click({force: true})
		cy.get('[class="trumbowyg-editor"]').clear().type('Testing of Project Testing');
		//cy.wait(2000)
		cy.get('#ddstatus').select('Off Track',{force: true})
		 
		
		cy.get('#btnSave').click({force: true})	
	
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Records Saved Successfully.!');
		  cy.wait(500)
			cy.get(".noty_body").click({ force: true })
			cy.wait(2000)
		  })
			
	})
	
	it('Verify Project Details', function () {	
		cy.wait(5000)
		cy.contains('tr', project1).invoke('index').then((i) => {
			cy.log('i: ', i)

	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(i).invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(project1);
				})	
			
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(i).invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Off Track');				
				})
		
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(3)').eq(i).invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Testing of Project Testing');				
				})
		
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(5)').eq(i).invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(currentDate);				
				})
					 
		})
		})
				
	it('Navigate Add Task Page', function() {
	
		//cy.get('#ProjectMaster').click({force: true})
		//cy.wait(5000)
		//cy.reload()
		
		cy.contains('tr', project1).invoke('index').then((i) => {
			cy.log('i: ', i)
			cy.get('#DataTables_Table_0 > tbody > tr> td:nth-child(6)>button:nth-child(3)').eq(i).click({force: true})
		
		})		
	})	
	
	it('Verify Validation Massges - Please Enter Task Name.', function() {	
		const { softAssert, softExpect } = chai;
		
			cy.get('[onclick="openNewTaskForm(this)"]').click({force: true})	
	
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Task Name.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })
		  	
			  		  
	})
	
	it('Verify Validation Massges - Please Enter Task Description', function() {	
		const { softAssert, softExpect } = chai;
			cy.get('#Name').click({force: true})
			cy.get('#Name').type(task)
			
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please Enter Task Description');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })		  		  
	})
	
	it('Verify Validation Massges - Please Enter Estimated Time.', function() {	
		const { softAssert, softExpect } = chai;
			cy.get('[class="trumbowyg-editor"]').click({force: true})
			cy.get('[class="trumbowyg-editor"]').type(description)
			
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please Enter Estimated Time.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })		  		  
	})
	
	it('Verify Validation Massges - Please Select Task Date.', function() {	
		const { softAssert, softExpect } = chai;
			cy.get('#EstimatedTime').click({force: true})
			cy.get('#EstimatedTime').type(estimatedTime)
			
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please Select Task Date.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })		  		  
	})
	
	it('Save Task Deatils', function() {	
		const { softAssert, softExpect } = chai;
		
			cy.get('#TaskDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate+' to '+endDate)
			})
			
			cy.get('#btnSave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Record Save successfully');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })		  		  
	})
	
	it('Verify Task Details', function() {	
		const { softAssert, softExpect } = chai;
		
			cy.wait(1000)
			cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task)
			{
			 softExpect(text.trim()).to.eq(task);	
			
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(estimatedTime);				
		})
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(3)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(startDate);				
		})
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(4)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(endDate);				
		})
		}			 
		})
		})
			
			
	})

	
	it('Edit Task Deatils', function() {	
		
			cy.wait(1000)
			cy.get('#DataTables_Table_0 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == task)
			{
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(8)>button[id="Edit"]').eq(num).click({force: true})
			cy.get('#Name').click({force: true})
			cy.get('#Name').clear().type(task2)
			
			cy.get('[class="trumbowyg-editor"]').click({force: true})
			cy.get('[class="trumbowyg-editor"]').clear().type(description2)
			
			cy.get('#EstimatedTime').click({force: true})
			cy.get('#EstimatedTime').clear().type(estimatedTime2)
			
			
			
			cy.get('#TaskDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate2+' to '+endDate2)
			})
			
			cy.get('#Priority').select(priority,{force: true})
			
			cy.fixture(file, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: file,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#btnSave').click({force: true})
		cy.wait(2000)
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Record Save successfully');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
			//cy.wait(1000)
		  })
		}
		})
		})			
	})
	
	it('Verify Task Details', function() {	
		const { softAssert, softExpect } = chai;
		
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
			 softExpect(text.trim()).to.eq(estimatedTime2);				
		})
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(3)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(startDate2);				
		})
		
		cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(4)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(endDate2);				
		})
		}			 
		})
		})
			
			
	})

	it('Add Task Deatils', function () {

		cy.get('[onclick="openNewTaskForm(this)"]').click({ force: true })
		cy.get('.row:nth-child(3) > .col-form-label').click();
		cy.get('#Name').click();
		cy.get('#Name').type('Test');
		cy.wait(1000)
		cy.get('.trumbowyg-editor').type('Test')
		cy.wait(1000)
		cy.get('#EstimatedTime').click();
		cy.get('#EstimatedTime').type('10');
		cy.get('#TaskDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/06/2021 to 15/06/2021')
		})
		cy.wait(1000)
		cy.get('#Priority').select('1');
		cy.get('#btnSave').click({ force: true })
		cy.url().should('contains', '/Timesheet/Transaction/project');


		cy.wait(2000)
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Record Save successfully');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
		})

	})

	it('Delete Task Deatils', function () {
		cy.get("#DataTables_Table_0> tbody").find("tr").its('length').as('intialLength');

		cy.contains('td', 'Test').invoke('index').then((i) => {
			cy.log('i: ', i)
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(8)>button[name="Delete"]').eq(i-3).click({ force: true })

			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Record Save successfully');
				cy.wait(500)
				cy.get(".noty_body").click({ force: true })
				//cy.wait(1000)
			})

		})

		cy.get('@intialLength').then(intialLength => {
			cy.get("#DataTables_Table_0> tbody").find("tr").should("have.length", intialLength -1);
		})

		
	})


	it('Verify Description in Edit Window', function () {
	
		cy.get('#btnOpenNewTaskForm').eq(0).click({ force: true })

		cy.get('#DataTables_Table_0 > tbody > tr').each(function (row, i) {
			var num = parseFloat(i)
			cy.wait(2000)
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == project1) {
					cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(6)>button:nth-child(1)').eq(num).click({ force: true })

					cy.get('#projectdescription').invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq('Testing of Project Testing');

					})
				}
			})
		})
	})

	it('Verify Update Status Functionality', function () {
		const { softAssert, softExpect } = chai;


		cy.get('#ddstatus1').select('Attention Required', { force: true })

		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Status Changes Successfully!');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
		})

		cy.get('#ProjectMaster').click({ force: true })
		cy.wait(5000)
		cy.get('#DataTables_Table_1 > tbody > tr').each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == project1) {
					softExpect(text.trim()).to.eq(project1);

					cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq('Attention Required');
					})
				}
			})
		})
	})

	it('Verify Add Member Functionality', function () {
		const { softAssert, softExpect } = chai;

		cy.get('#DataTables_Table_1 > tbody > tr').each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == project1) {
					softExpect(text.trim()).to.eq(project1);
					cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(6)>button:nth-child(1)').eq(num).click({ force: true })
					cy.wait(500)
					cy.get('[class="select2-selection__rendered"]').click({ force: true })
					//cy.wait(2000)
					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(managerID)
					//cy.wait(2000)
					cy.get('.select2-results__option--highlighted').click({ force: true })
					//cy.wait(2000)

					

					cy.get('[class="select2-selection__rendered"]').click({ force: true })
					
					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(employeeID1)
					cy.get('.select2-results__option--highlighted').click({ force: true })

					cy.get('[class="select2-selection__rendered"]').click({ force: true })

					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(employeeID2)
					cy.get('.select2-results__option--highlighted').click({ force: true })


					cy.get('[onclick="addMembers()"]').click({ force: true })


					cy.get('[onclick="viewMembers()"]').click({ force: true })

					cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(0).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq(managerID);

					})
					
					cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(1).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq(employeeID1);

					})
						cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(2).invoke('text').then((text) => {
							cy.log(text.trim())
							softExpect(text.trim()).to.eq(employeeID2);

						})

					cy.get('[class="btn btn-danger"]').click({ force: true })
				}

			})
		})

	})

	it('Verify Delete Functionality', function() {	
		cy.get('#ProjectMaster').click({ force: true })
		cy.get("#DataTables_Table_2> tbody").find("tr").its('length').as('intialLength');

		
		cy.get('#DataTables_Table_2 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
		
			cy.get('#DataTables_Table_2> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == project)
			{
			cy.get('#DataTables_Table_2> tbody > tr> td:nth-child(6)>button:nth-child(2)').eq(num).click({force: true})	
					cy.wait(1000)
					cy.get(".noty_body").invoke('text').then((text) => {
						softExpect(text.trim()).to.contains('Record deleted successfully.');
		
		  })
		}			 
		})
		})
			
		cy.get('@intialLength').then(intialLength => {
			cy.get("#DataTables_Table_2> tbody").find("tr").should("have.length", intialLength - 1);
		})

	})

	it('Add Project', function () {
		cy.wait(10000)
		cy.get('#btnOpenForm').click({ force: true })
		cy.wait(2000)
		cy.get('#txtName').click({ force: true })
		cy.get('#txtName').clear().type(project2);
		//cy.wait(2000)
		cy.get('#txtCode').click({ force: true })
		cy.get('#txtCode').clear().type('P1');
		//cy.wait(2000)
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/06/2021')
		})
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('30/06/2021')
		})
		cy.get('[class="trumbowyg-editor"]').click({ force: true })
		cy.get('[class="trumbowyg-editor"]').clear().type('Testing of Project Testing');
		//cy.wait(2000)
		cy.get('#ddstatus').select('Off Track', { force: true })


		cy.get('#btnSave').click({ force: true })

		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully.!');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
			cy.wait(2000)
		})

	})


	it('Add Task Deatils', function () {
		cy.reload()
		cy.wait(2000)
		cy.contains('tr', project2).invoke('index').then((i) => {
			cy.log('i: ', i)
			cy.get('#DataTables_Table_0 > tbody > tr> td:nth-child(6)>button:nth-child(3)').eq(i).click({ force: true })

		})
		cy.get('[onclick="openNewTaskForm(this)"]').click({ force: true })
		cy.get('.row:nth-child(3) > .col-form-label').click();
		cy.get('#Name').click();
		cy.get('#Name').type(task2);
		cy.wait(1000)
		cy.get('.trumbowyg-editor').type('Test')
		cy.wait(1000)
		cy.get('#EstimatedTime').click();
		cy.get('#EstimatedTime').type('10');
		cy.get('#TaskDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/06/2021 to 15/06/2021')
		})
		cy.wait(1000)
		cy.get('#Priority').select('1');
		cy.get('#btnSave').click({ force: true })
		cy.url().should('contains', '/Timesheet/Transaction/project');


		cy.wait(2000)
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Record Save successfully');
			cy.wait(500)
			cy.get(".noty_body").click({ force: true })
		})

	})

	it('Add Members ', function () {
		
		cy.get("#btnOpenNewTaskForm").eq(0).click({ force: true })

		cy.get('#DataTables_Table_0 > tbody > tr').each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == project2) {
					softExpect(text.trim()).to.eq(project2);
					cy.get('#DataTables_Table_0> tbody > tr> td:nth-child(6)>button:nth-child(1)').eq(num).click({ force: true })
					cy.wait(500)
					cy.get('[class="select2-selection__rendered"]').click({ force: true })
					//cy.wait(2000)
					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(managerID)
					//cy.wait(2000)
					cy.get('.select2-results__option--highlighted').click({ force: true })
					//cy.wait(2000)



					cy.get('[class="select2-selection__rendered"]').click({ force: true })

					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(employeeID1)
					cy.get('.select2-results__option--highlighted').click({ force: true })

					cy.get('[class="select2-selection__rendered"]').click({ force: true })

					cy.get('input[type="search"]').eq(1).click({ force: true })
					cy.get('input[type="search"]').eq(1).type(employeeID2)
					cy.get('.select2-results__option--highlighted').click({ force: true })


					cy.get('[onclick="addMembers()"]').click({ force: true })

					cy.wait(5000)
					cy.get('[onclick="viewMembers()"]').click({ force: true })

					cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(0).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq(managerID);

					})

					cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(1).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq(employeeID1);

					})
					cy.xpath("//table[@id='tblMemberLists']/tr/td[1]").eq(2).invoke('text').then((text) => {
						cy.log(text.trim())
						softExpect(text.trim()).to.eq(employeeID2);

					})

					cy.get('[class="btn btn-danger"]').click({ force: true })
				}

			})
		})

	})


})
	