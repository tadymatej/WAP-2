CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    project_id INTEGER REFERENCES projects(id)
);

INSERT INTO projects (name) VALUES ('Project 1'), ('Project 2');

INSERT INTO tasks (name, completed, project_id) VALUES 
('Task 1', false, 1),
('Task 2', true, 1),
('Task 3', false, 2);