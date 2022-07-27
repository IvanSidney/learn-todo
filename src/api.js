const Api = {

    async getData() {
        const response = await fetch('http://146.190.226.226:8000/api/core/tasks');
        const data = await response.json();
        return data.content || [];
    },

    async addTodo(item) {
        try {
            await fetch('http://146.190.226.226:8000/api/core/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: item.name,
                    content: 'content'
                })
            });
        } catch (e) {
            console.log(e);
        }
    },

    async removeById(id) {
        console.log(id);
        try {
            await fetch('http://146.190.226.226:8000/api/core/tasks' + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            });

        } catch (e) {
            console.log(e);
        }
    }
};

export default Api;