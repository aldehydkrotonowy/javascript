var menuJSON = {
    tabMenu : [
        {name: 'HOME', link: './index.html'},
        {name: 'PROJECTS', link: './projects.html'},
        {name: 'MY CV', link: './index.html'},        
        ]
} 
function parseMenu(tabMenu){
    var menu = document.getElementById("menu");
    var ul = document.createElement("ul");
    for(var i=0; i<tabMenu.length; i++){  
        ul.innerHTML += '<li><a href="'+tabMenu[i].link+'">'+tabMenu[i].name+'</a></li>';
    }
    menu.appendChild(ul);
}
parseMenu(menuJSON.tabMenu);   