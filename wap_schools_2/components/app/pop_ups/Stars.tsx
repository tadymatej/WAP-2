
import { Star, StarHalf } from "lucide-react";

interface StarsState {
  count : number;
}

export function Stars( {count} : StarsState ) {
  function getStars(rating : number) {
    let stars : JSX.Element[] = [];
    for(let i = 0; i < Math.floor(rating); ++i) {
      stars.push(<Star key={"star" + i} fill="hsl(var(--primary))" strokeWidth={0} />)
    }
    if(rating - Math.floor(rating) >= 0.1)
      stars.push(<StarHalf key={"half-star"} fill="hsl(var(--primary))" strokeWidth={0} />)
    return stars;
  }

  function getStaticStars() {
    let stars : JSX.Element[] = [];
    for(let i = 0; i < 5; ++i) {
      stars.push(<Star key={"stars" + i} fill="hsl(var(--primary) / 0.2)" strokeWidth={0} />)
    }
    return stars;
  }

  return (
    <div>
      <div className="relative">
        <div className="flex gap-1">
          {
            getStaticStars()
          }
        </div>
        <div className="flex gap-1 top-0 absolute">
              {getStars(count)}
        </div>
      </div>
    </div>
  )
}