
const app = new Vue({
    el: '#app',
    data: {
        title: 'Tasks',
        newTodo: '',
        todos: []
    },



    methods: {
        addTodo() {
            this.todos.push({
                title: this.newTodo,
                done: false,
            });
            this.newTodo = '';
            this.saveTodos();
        },

        removeTodo(todo) {
            const todoIndex = this.todos.indexOf(todo);
            this.todos.splice(todoIndex,1);
            this.saveTodos();
        },

        allDone() {
            this.todos.forEach(todo => {
                todo.done = true;
            })
            this.saveTodos();
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
    }


});


