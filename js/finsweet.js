function fintest() {
	(function() {
	// create a new Library instance and store it in a variable called "projectsGrid"
	var projectsGrid = new FsLibrary('.collection-list')
  
	// run loadmore on our instance
  projectsGrid.loadmore({
		button: ".load-more-button",
    resetIx: true,
    loadAll: true,
    paginate: {
			enable: true,
			itemsPerPage: 5,
			insertPagination: '.pagination-container',
			bgColor: '#ffffff',
			bgColorActive: '#7757ff',
			textColor: '#000000',
      textColorActive: '#FFFFFF',
			borderColor: '#3D315B'
    },
		animation: {
			enable: false
		}
	})
})();
}

document.addEventListener('DOMContentLoaded', fintest);    
