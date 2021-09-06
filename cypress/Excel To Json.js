

	describe('PF Settings', function() {
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';
	var current_File = ['Separation', 'Birthday' ]
		
	it('successfully page  loads', function() {
		 
 
	cy.task('convertExcelToJson_CurrentFile',{file:'demo', fileName:'MasterImport.xlsx'})
	
	
	})

	})
