function todayDate(today) {
    return today.toLocaleDateString('en-US', {
        day: 'numeric',
        weekday: 'long',
        month: 'short'
    })
}



const app = new Vue({
    el: '#app',
    data: {
        title: 'Tasks',
        today: new Date(),
        isActive: false,
        todoSave: 'Salvo',
        newTodo: '',
        todos: [],
        
        
        
    },

    filters: {
        date: todayDate,
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


