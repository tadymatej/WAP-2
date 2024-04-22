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

zip: gen_doc
	zip xzalma00.zip -r README.md data-prepare.py obce-get-coordinates.py ./wap_schools_2/app/* ./wap_schools_2/actions/* ./wap_schools_2/components/* ./wap_schools_2/enums/* ./wap_schools_2/helpers/* ./wap_schools_2/lib/* ./wap_schools_2/prisma/* ./wap_schools_2/public/* ./wap_schools_2/repositories/* ./wap_schools_2/state/* ./wap_schools_2/app/components.json ./wap_schools_2/app/docker-start.sh ./wap_schools_2/app/generate-db.dh ./wap_schools_2/app/next.config.mjs ./wap_schools_2/app/package-lock.json ./wap_schools_2/app/package.json postcss.config.mjs ./wap_schools_2/app/README.md ./wap_schools_2/app/run-db.sh ./wap_schools_2/app/tsconfig.json ./wap_schools_2/app/tailwind.config.ts ./exporter/** ./docs/* ./coordinatesExtractor/* ./db/* ./design/* ./wap_schools_2/components.json ./wap_schools_2/next-env.d.ts ./wap_schools_2/next.config.mjs ./wap_schools_2/package-lock.json ./wap_schools_2/package.json ./wap_schools_2/postcss.config.mjs ./wap_schools_2/run-db.sh ./wap_schools_2/tailwind.config.ts ./wap_schools_2/tsconfig.json ./wap_schools_2/docker-start.sh ./wap_schools_2/generate-db.sh ./data/* ./db/* ./wap_schools_2/.env

gen_doc:
	doxygen ./* ./Doxyfile
#rm -r ./docs/py
	cp -r ./html ./docs/py
	cd wap_schools_2 && npx typedoc ./ --out ./docs --entryPointStrategy expand --exclude "node_modules/**/*.js --exclude" "node_modules/**/*.ts" --exclude "node_modules/**/*.mjs" --exclude "node_modules/**/*.mts" --exclude "node_modules/**/*.d.ts"
#rm -r ./docs/ts
	mv ./wap_schools_2/docs ./docs/ts