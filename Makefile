.PHONY: create-env load-env enter-env

create-env:
	python3 -m venv myenv && source myenv/bin/activate && pip install pandas psycopg2 && pip freeze > requirements.txt && deactivate

load-env:
	python3 -m venv myenv && source myenv/bin/activate && pip install -r requirements.txt

enter-env:
	source myenv/bin/activate