const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete'
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const todoText = prompt("Enter TODO");
  let li = document.createElement('li');

  setStyle(classNames.TODO_ITEM, li);
  let span = document.createElement('span');

  setStyle(classNames.TODO_TEXT, span);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  setStyle(classNames.TODO_CHECKBOX, checkBox);

  let del = document.createElement('del');
  del.setAttribute('class', 'fa fa-trash');
  
  const deleteBox = document.createElement('button');
  deleteBox.setAttribute('class', 'delete');
  setStyle(classNames.TODO_DELETE, deleteBox);



  // if nothing entered, break
  if (todoText.length === 0) {
    alert('I know you something to enter')
    return false;
  } else {
    li.appendChild(document.createTextNode(' ' + todoText));
  }

  list.appendChild(li);
  li.appendChild(span);
  li.appendChild(checkBox);
  deleteBox.appendChild(del);
  span.appendChild(deleteBox);

  // count todos in list
  countTodos(itemCountSpan);

  countUncheckedTodos(uncheckedCountSpan);

  let checkedItems = li.lastChild;

  checkedItems.addEventListener('click', function (e) {
    if (e.target.checked) {
      let count = uncheckedCountSpan.innerHTML;
      count--;
      uncheckedCountSpan.innerHTML = count.toString();

    } else if (!e.target.checked) {
      let count = uncheckedCountSpan.innerHTML;
      count++;
      uncheckedCountSpan.innerHTML = count.toString();
    } else { }
  });

  // deleting function

  const deleteItemFromTodo = document.getElementsByTagName('span');

  for (let i = 0; i < deleteItemFromTodo.length; i++) {
    deleteItemFromTodo[i].addEventListener('click', deleteTodoItem);
  }
}

function deleteTodoItem(e) {

  // decrement count for unchecked items 
  let deleteUncheckedItems = +uncheckedCountSpan.innerHTML;
  if (deleteUncheckedItems === 0) {
    deleteUncheckedItems = 0;
  } else {
    deleteUncheckedItems--;
  }
  uncheckedCountSpan.innerHTML = deleteUncheckedItems;

  // decrement count for Item count 
  let itemCount = +itemCountSpan.innerHTML;
  itemCount--;
  itemCountSpan.innerHTML = itemCount;

  this.parentElement.remove();
}

function countUncheckedTodos(value) {
  let count = +value.innerHTML;
  count++;
  uncheckedCountSpan.innerHTML = count;
}

function countTodos(value) {
  let count = +value.innerHTML;
  count++;
  itemCountSpan.innerHTML = count;
}

function setStyle(selector, property) {
  property.setAttribute('class', selector);
}