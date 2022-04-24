// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract TodoList {
    struct Todo {
        string text;
        bool isCompleted;
    }

    Todo[] public todos;

    function getTodo(uint _index) external view returns(string memory, bool) {
        return (todos[_index].text, todos[_index].isCompleted);
    }

    function createTodo(string memory _text) external {
        // Todo _todo = new Todo

        todos.push(Todo({
            text: _text,
            isCompleted : false
        }));
    }

    function toggleComplete(uint _index) external {
        todos[_index].isCompleted = !todos[_index].isCompleted;        
    }

    function updateText(uint _index , string memory _text) external {
        todos[_index].text = _text;        
    }


}