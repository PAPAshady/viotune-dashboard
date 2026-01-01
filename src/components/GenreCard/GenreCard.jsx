import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Separator } from '@components/ui/separator';
import { MusicIcon, ListMusicIcon } from 'lucide-react';

import defaultCover from '@assets/images/default-cover.jpg';

function GenreCard() {
  return (
    <Card>
      <div className="relative aspect-video overflow-hidden">
        <img src={defaultCover} className="size-full object-cover" />
        <div className="absolute inset-0 size-full">
          <div className="flex flex-wrap justify-end gap-1 pe-3 pt-3">
            <Badge variant="secondary" className="flex items-center">
              <MusicIcon className="mr-1 size-4!" />
              <span className="text-xs">100</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <ListMusicIcon className="mr-1 size-4!" />
              <span className="text-xs">100</span>
            </Badge>
          </div>
        </div>
      </div>

      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-balance">R&B</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm text-pretty">
            Narrative-driven music rooted in American folk and western traditions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">storytelling</Badge>
          <Badge variant="secondary">heartfelt</Badge>
          <Badge variant="secondary">heavy</Badge>
        </div>
        <Separator className="my-4" />
      </CardContent>
    </Card>
  );
}

export default GenreCard;
