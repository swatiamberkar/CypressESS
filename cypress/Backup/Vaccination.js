
describe('Vaccination', function() {
	const { softAssert, softExpect } = chai;
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	const Day3 = parseInt(Day)-2
	const twoDaysBefore = Day3+'/'+Month+'/'+year
	
		
	var employeeID = 'S03'
	var employeeIDName = 'Project Management'
	
	var VaccineType = 'Moderna'	
	var VaccineDose = 'Dose 1'
	var VaccineType1 = 'Sputnik V'
	
	
	var VaccineType2 = 'Moderna'	
	var VaccineDose2 = 'Dose 2'
	var VaccineDate2 = yasterdayDate
	var Certificate2 = 'VaccineInfo.pdf'

	var VaccineDate3 = twoDaysBefore
	var Certificate3 = 'GreytrixSSLVPN.pdf'
		
	var description = 'Testing of Task-1'
	var estimatedTime = '150'
	var startDate = '01/05/2021'
	var endDate = '31/05/2021'
	
	

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
		//cy.wait(2000)
		

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
		//cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		//cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(employeeID)
		
		//cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		//cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		//cy.wait(2000)
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
	
/*	it('Pocket HRMS Login', function() {
		cy.cloudLogin()
		cy.changeCompany()
	})
		
	it('Set Direct Update from Profile Setting', function() {	
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Profile&submodule=ProfileSetting')
		cy.get('#Profile_ProfileSettings').click({force: true})
		cy.get('[name="VACCINATION"][value="direct"]').click({force: true})
		cy.get('#savedata').click({force: true})	
		cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Saved Successfully!');
		  })		
	})
*/
	
	it('Login into Pocket ESS', function() {
		cy.EmployeeLogin()
	})
	
	it('Navigate to Project Master', function() {	
		cy.visit(Cypress.env('url')+'Home/Dashboard?Menu=Vaccination')
		//cy.wait(2000)	 
	})
		
	it('Verify Validation Massges - Please select vaccine type.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#btnOpenForm').click({force: true})
		
		cy.get('#btnsave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please select vaccine type.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Please select vaccine dose.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#VaccineType').select(VaccineType,{force: true})
		
		cy.get('#btnsave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please select vaccine dose.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})

	it('Verify Vaccination Details with Mandatory Fields', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#VaccineDose').select(VaccineDose,{force: true})
		
		cy.get('#btnsave').click({force: true})	
	
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Data Saved Successfully!!!');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		})
	
		 // cy.wait(5000)
		cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose)
			{
			 softExpect(text.trim()).to.eq(VaccineDose);	
			
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(VaccineType);				
		})
		
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(3)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		}			 
		})
		})
			
			
	})

	it('Verify Validation Massges - Please select same Vaccine Type', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#btnOpenForm').click({force: true})
		cy.get('#VaccineType').select(VaccineType1,{force: true})
		cy.get('#VaccineDose').select(VaccineDose,{force: true})
		
		cy.get('#btnsave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Please select same Vaccine Type');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Please select another Dose', function() {	
			const { softAssert, softExpect } = chai;
			cy.get('#VaccineType').select(VaccineType,{force: true})
			
			cy.get('#btnsave').click({force: true})
		
			 cy.get(".noty_body").invoke('text').then((text) => {
			 softExpect(text.trim()).to.contains('Please select another Dose');
			 cy.wait(500)
				cy.get(".noty_body").click({force: true})
			  })	  		  
		})

/*	it('Verify Validation Massges - Please select another Dose', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#VaccineType').select(VaccineType2,{force: true})
		
		cy.get('#btnsave').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please select another Dose');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
*/

	it('Verify Vaccination Details with All Fields', function() {	
		const { softAssert, softExpect } = chai;
		//cy.get('#btnOpenForm').click({force: true})
		cy.get('#VaccineType').select(VaccineType2,{force: true})
		
		cy.get('#txtdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(VaccineDate2)
		})
			
		cy.get('#VaccineDose').select(VaccineDose2,{force: true})
		
		cy.fixture(Certificate2, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Certificate2,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		 
		
		
		cy.get('#btnsave').click({force: true})	
		cy.wait(5000)
		cy.visit(Cypress.env('url')+'Home/Dashboard?Menu=Vaccination')
		
	/*	cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.contains('Data Save successfully');
		
		})
	*/
			//cy.wait(5000)
			cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose2)
			{
			 softExpect(text.trim()).to.eq(VaccineDose2);	
			
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(VaccineType2);				
		})
		
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(3)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(VaccineDate2);				
		})
		}			 
		})
		})		
	})
	
/*	it('Verify Certificate Downloaded or not', function() {	
		const { softAssert, softExpect } = chai;
			cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose2)
			{
			 softExpect(text.trim()).to.eq(VaccineDose2);	
			
				cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
		setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(4) >a').eq(num)
		.should("be.visible")
		.click();
		
		})
		
			}
			})
			  		  
	})
	
	})
	
	it('Verify Update Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(5000)
			cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose2){
			 softExpect(text.trim()).to.eq(VaccineDose2);	
			
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(6)>button:nth-child(1)').eq(num)
		.click({force: true})	
		
		cy.get('#txtdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(VaccineDate3)
		})
			
		cy.get('#VaccineDose').select(VaccineDose2,{force: true})
		
		cy.fixture(Certificate3, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Certificate3,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		
		
		cy.get('#btnsave').click({force: true})	
	
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Data Save successfully');
		
		})
	
			cy.wait(5000)
			cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose2)
			{
			 softExpect(text.trim()).to.eq(VaccineDose2);	
			
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(1)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(VaccineType2);				
		})
		
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(3)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(VaccineDate3);				
		})
		}			 
		})
		})
			}
			})	
		
			})
	})
	
	it('Verify Delete Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(5000)
		
		cy.get('#DataTables_Table_1> tbody')
  .find('tr')
  .then(listing => {
    const lenBeforeDelete = Cypress.$(listing).length;
    
  
  
		
		cy.log('len: '+lenBeforeDelete)
		
			cy.get('#DataTables_Table_1> tbody > tr').each(function(row, i){	
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(2)').eq(num).invoke('text').then((text) => {
			cy.log(text.trim())
			if (text.trim() == VaccineDose2){
			 softExpect(text.trim()).to.eq(VaccineDose2);	
			
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(6)>button:nth-child(2)').eq(num)
		.click({force: true})	

		//cy.get(".noty_body").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Data Save successfully');
		//})
	
	cy.get('#DataTables_Table_1> tbody')
  .find('tr')
  .then(listing => {
    const lenAfterDelete = Cypress.$(listing).length;
	softExpect(lenBeforeDelete).to.eq(lenAfterDelete+1);
	
  })
  cy.wait(5000)	
	
		cy.get('#DataTables_Table_1> tbody > tr> td:nth-child(6)>button:nth-child(2)').eq(0)
		.click({force: true})	
	
			}
			})	
		
			})
  })
	})
	
	
	it('Verify Employee Count in Vaccination Dashboard according Employee List', function() {	
		const { softAssert, softExpect } = chai;
		cy.wait(5000)
		cy.cloudLogin()
		cy.changeCompany()
		
		 cy.xpath("//h2[@class='ml-auto mr-auto text-nowrap getTotalActiveEmployees']").invoke('text').then((TotalActiveEmployees) => {
		 cy.log('TotalActiveEmployees: '+TotalActiveEmployees)
		 
		 
		 cy.visit(Cypress.env('cloudUrl')+ 'Identity/Home/VaccinationDashboard')
		 
		  cy.xpath("//body[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]")
  .find('tr')
  .then(listing => {
    const VaccinatedEmployeeCount = Cypress.$(listing).length;
	
		
	cy.xpath("//table[@id='datatable']/tbody")
  .find('tr')
  .then(listing => {
    const NotVaccinatedEmployeeCount = Cypress.$(listing).length;
	 
		 softExpect(Number(TotalActiveEmployees.trim())).to.eq(VaccinatedEmployeeCount + NotVaccinatedEmployeeCount);	
		 })
		 })
		 
		  })
	})
*/	

})
	