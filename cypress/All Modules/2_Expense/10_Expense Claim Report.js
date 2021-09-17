
describe('Expense Claim Report', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var transcationID = ''
	var companyCode = ''
	var employeeID ='GT15'
	var managerID = 'GT02'
	var managerID2 = 'GT03'
	var financeID = 'GT05'
	var filePath= 'demo.xlsx'
	

	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('EmployeeLogin',()=>{
	
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(employeeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('ManagerLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager2Login',()=>{
	
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID2)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID2)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('FinanceLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(financeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(financeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	it('Navigate My Claim Report', function() {
		cy.EmployeeLogin()		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyExpenseReports?Menu=myclaimreport')
		cy.wait(2000)
	})
	
	it('Verify Validation Massges - Please Select Filter', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#search').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Select Filter');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})

	it('Verify Records according claim Status', function() {
		const { softAssert, softExpect } = chai;
		let claimStatus =
		[ "Pending", "Approved", "Rejected", "Finance Approved", "Finance Rejected", "Cancelled"];	
		
		 for(let j=0; j< claimStatus.length; j++){
			cy.get('#claimprps').select(claimStatus[j],{force: true})
			cy.wait(1000)
			cy.get('#search').click({force: true})
			cy.wait(3000)
			cy.get('body').then(($body) => {
 
			if ($body.find('#EStableSorter > tbody > tr').length > 1) {
    
			cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			cy.wait(3000)
			cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(4)').contains(claimStatus[j].split(" ").join(""))
			
			})
			
			}
			else
			{
				cy.get(".dataTables_empty").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('No data available in table');
				})	
			}
			})
		 }
			
	})
	
	it('Verify Records according Search functionality', function() {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('url')+'Expense/Reports/MyExpenseReports?Menu=myclaimreport')
		cy.wait(2000)
		
			cy.get('[placeholder="Search..."]').click({force: true})
			cy.get('[placeholder="Search..."]').clear().type('Local')
		
			cy.get('#EStableSorter>tbody>').contains('Local')
			cy.wait(2000)
			cy.get('[placeholder="Search..."]').click({force: true})
			cy.get('[placeholder="Search..."]').clear().type('Office')
		
			cy.get('#EStableSorter>tbody>').contains('Office').should('not.exist')
			cy.get(".dataTables_empty").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('No matching records found');
			})
		
	})
	
	it('Verify Entries according Pagination count', function() {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('url')+'Expense/Reports/MyExpenseReports?Menu=myclaimreport')
		cy.wait(2000)
		let pagination =
		[ "10", "25", "50", "100"];	
		
		 for(let j=0; j< pagination.length; j++){
			cy.get('[name="EStableSorter_length"]').select(pagination[j],{force: true})
			cy.wait(1000)
			
			cy.get('[name="EStableSorter_length"] > option:selected').invoke('text').then((text) => {
			cy.log(text.trim())
			 
			 
		cy.get('#EStableSorter_info').invoke('text').then((text) => {
		var pageCount = text.split(' ')[3]
		cy.log('pageCount:' +pageCount)
		cy.get('#EStableSorter > tbody').find('tr').should('have.length', pageCount)
  
		assert.isAtLeast(parseInt(pagination[j]), parseInt(pageCount), pageCount+' less than equal to '+pagination[j])
		
  
	})

	})
		
			
		 }
	})
	

})
	