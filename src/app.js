
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

        addTodo() {
            if(!this.newTodo) { return; }
            
            this.todos.push({
                title: this.newTodo,
                done: false,
                
            });

            
            this.newTodo = '';
            
        },

        addEditTodo(todo) {

            if(!this.newEditTodo) { return todo.title; }
            todo.title = this.newEditTodo;
            this.isEdit = !this.isEdit;
            
        },

        editTodo(todo) {
            this.newEditTodo = todo.title;            
            this.isEdit = !this.isEdit;
            todo.title = '';
            
        },

        isChecked () {
            this.todos.forEach(todo => {
                this.saveTodos();
                this.isActive = !this.isActive;

            })
        },

        deleteTodo(todo) {
            const todoIndex = this.todos.indexOf(todo);
            this.todos.splice(todoIndex,1);
            
        },

        allDone() {
            this.todos.forEach(todo => {
                todo.done = true;
            });

            
        },

        allDelete() {
            this.todos = [];
            this.saveTodos();
        },

        saveTodos() {
            const parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos',parsed);
        },


    },

        
    mounted() {
        if(localStorage.getItem('todos')) {
            try {
                this.todos = JSON.parse(localStorage.getItem('todos'));
            } catch(e) {
                localStorage.removeItem('todos');
            }
        }
    },



});


