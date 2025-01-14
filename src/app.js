import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal
} from 'bootstrap';
import Api from './api';

console.log('im here');

function init() {

    var myModal = new Modal(document.getElementById('exampleModal'));

    renderTodos();

    const mainForm = document.forms.main;
    const mainFormInput = mainForm.input;
    mainForm.addEventListener('submit', (e) => {
        if (!mainFormInput.value) {
            e.preventDefault();
        } else {
            // const input = mainFormInput.value;
            Api.addTodo({
                name: mainFormInput.value
            }).then(() => {
                myModal.hide();
                mainFormInput.value = '';
                renderTodos();
            });
            e.preventDefault();
        }
    });

    document.getElementById('container').addEventListener('click', (e) => {
        const el = e.target;
        if (el.classList.contains('remove-todo')) {

            const liEl = el.closest('li');

            Api.removeById(liEl.id).then(() => {
                renderTodos();
            });
        }

    }, {
        capture: true
    });

}

(function () {

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
})();

function renderTodos() {

    document.getElementById('container').innerHTML = '';

    Api.getData().then((data) => {
        data.forEach((item) => {
            const li = document.createElement('li');
            li.id = item.id;
            li.innerHTML =
                `<div class="input-group mb-3">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input type="text" value="${item.name}" class="form-control">
                <div class="input-group-text">
                    <button type="button" class="btn btn-primary remove-todo">Remove</button>
                </div>
            </div>`;
            document.getElementById('container').appendChild(li);

        });
    }, (e) => console.log(e));



}

init();