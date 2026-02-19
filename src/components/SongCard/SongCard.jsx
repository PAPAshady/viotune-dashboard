import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import defaultCover from '@assets/images/default-cover.jpg';
import { formatTime } from '@/utils';

function SongCard({ id, title, cover, artist, duration, genre_name, onSelect, isSelected }) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors',
        isSelected ? 'bg-primary/10 border-primary/30' : 'hover:bg-muted/50 border-transparent'
      )}
      onClick={() => onSelect(id)}
    >
      <Checkbox onCheckedChange={() => onSelect(id)} checked={isSelected} />
      <img src={cover || defaultCover} className="h-10 w-10 shrink-0 rounded object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-muted-foreground truncate text-xs">{artist}</p>
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
