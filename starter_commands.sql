CREATE TABLE IF NOT EXISTS books (
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	checkedOut INTEGER,
	quantity INTEGER
);

INSERT INTO
books(title, description, checkedOut, quantity)
VALUES
('Harry Potter', 'boy who lived', 0, 3),
('LOTR', 'the ring', 1, 2);

SELECT * FROM books;
SELECT id, title FROM books;
SELECT * FROM books WHERE id > 1;

DELETE FROM books
WHERE id = 1;