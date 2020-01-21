
const app = new Vue({
    el: '#app',
    data: {
        title: 'Tasks',
        isActive: true,
        isEdit: false,
        todoSave: 'Saved',
        newTodo: '',
        newEditTodo: '',
        todos: [],
            
    },

    methods: {
        //Create add todo function
        addTodo() {

            //Don't add a todo if the input is empty
            if(!this.newTodo) { return; }
            
            //Add a todo in the array if the input is not empty
            //the todo have 2 proprieties 
            this.todos.push({
                title: this.newTodo,
                done: false,
                
            });

            //Clear the input in the final of the add function
            this.newTodo = '';
            
        },
        //Edit todo function
        //the parameter is a todo
        editTodo(todo) {
            //add the text of the todo in input
            this.newEditTodo = todo.title; 
            
            //Turn the 'isEdit' data to true
            this.isEdit = !this.isEdit;

            //clear the text in the todo
            todo.title = '';
            
        },
        //Add the function add editable todo
        addEditTodo(todo) {
            //Return text of the todo if the input is empty
            if(!this.newEditTodo) { return todo.title; }

            //Change the text in the todo to the input box
            todo.title = this.newEditTodo;

            //Turn the 'isEdit' data to false
            this.isEdit = !this.isEdit;
            
        },

        //This function add an event that saves 
        //the items in the todos array to localStorage
        isChecked () {
            //loop through in todos array and save in the localStorage
            this.todos.forEach(todo => {
                this.saveTodos();

                //Turn the 'isActive' data to true
                this.isActive = !this.isActive;

            })
        },

        //This function delete a todo in the array by the index
        deleteTodo(todo) {
            //getting the index of the todo in the array
            const todoIndex = this.todos.indexOf(todo);

            //Remove the 1 todo by the index
            this.todos.splice(todoIndex,1);
            
        },

        //This function add an event that mark all checkbox 
        //in the Todo List 
        allDone() {
            //loop through in todos array
            //turn all done properties to true
            this.todos.forEach(todo => {
                todo.done = true;
            });

            
        },

        //this function just clear the array by a event
        allDelete() {
            this.todos = [];
            this.saveTodos();
        },
        //this function just save the todos array in LocalStorage
        //parsing the item to JSON 
        saveTodos() {
            const parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos',parsed);
        },


    },

        
    mounted() {
        //save the array in localStorage
        if(localStorage.getItem('todos')) {
            try {
                this.todos = JSON.parse(localStorage.getItem('todos'));
            } catch(e) {
                localStorage.removeItem('todos');
            }
        }
    },



});


