import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Separator } from '@components/ui/separator';
import { Music, ListMusic, PencilIcon, MoreHorizontalIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu';

import defaultCover from '@assets/images/default-cover.jpg';

function GenreCard({ title, cover, description, tags, songsCount, albumsCount }) {
  return (
    <Card className="flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img
          src={cover || defaultCover}
          loading="lazy"
          alt={title}
          className="size-full object-cover"
        />
      </div>
      <CardContent className="flex grow flex-col px-3">
        <div className="h-full grow">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-balance">{title}</h3>
            <p className="text-muted-foreground mt-1 text-sm text-pretty">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <div className="flex items-center gap-1 text-xs">
            <Music className="size-4" /> {songsCount.toLocaleString()} Songs
          </div>
          <div className="flex items-center gap-1 text-xs">
            <ListMusic className="size-4" /> {albumsCount.toLocaleString()} Albums
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="grow">
            <PencilIcon />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-1.5!">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <EyeIcon />
                <span className="ms-1">View</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon />
                <span className="text-destructive ms-1">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

// function CardBadge ({})

export default GenreCard;
