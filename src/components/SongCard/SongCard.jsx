import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import defaultCover from '@assets/images/default-cover.jpg';
import { formatTime } from '@/utils';

function SongCard({ title, cover, artist, duration, genre_name }) {
  return (
    <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors">
      <Checkbox />
      <img src={cover || defaultCover} className="h-10 w-10 shrink-0 rounded object-cover" />
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">{title}</p>
        <p class="text-muted-foreground truncate text-xs">{artist}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge className="hidden min-[360px]:block" variant="outline">
          {genre_name}
        </Badge>
        <span className="text-muted-foreground text-xs tabular-nums">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default SongCard;
