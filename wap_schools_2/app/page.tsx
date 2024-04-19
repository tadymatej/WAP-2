import { FilterCard } from "@/components/app/filters/FIlterCard";

export default async function Home() {
	const thousandStrings = Array.from(
		{ length: 300 },
		(_, i) => `String ${i + 1}`
	);
	return (
		<main className="flex min-h-screen p-8">
			<div className="grid grid-cols-5 gap-8">
				<div className="bg-red-500 col-span-1 h-full grid grid-rows-2 min-w-fit">
					<div className="row-span-1">
						<FilterCard />
					</div>
					<div className="row-span-1">{/* <FilterCard /> */}</div>
				</div>
				{/* TODO change z index */}
				<div className="col-span-4 h-full z-20">
					{/* <ScrollArea>
                            {thousandStrings.map((str, index) => (
                            <p key={index}>{str}</p>
                            ))}
                        </ScrollArea> */}
				</div>
			</div>
		</main>
	);
}
