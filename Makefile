.PHONY: create-env load-env enter-env

create-env:
	python3 -m venv myenv && source myenv/bin/activate && pip install pandas psycopg2 && pip freeze > requirements.txt && deactivate

load-env:
	python3 -m venv myenv && source myenv/bin/activate && pip install -r requirements.txt

enter-env:
	source myenv/bin/activate
load-data:
	python3 data-prepare.py
init-postgres:
	systemctl start docker
	./wap_schools_2/run-db.sh
start-docker:
	systemctl start docker
start-postgres:
	./wap_schools_2/docker-start-db.sh