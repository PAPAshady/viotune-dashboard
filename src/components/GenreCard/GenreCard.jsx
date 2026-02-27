import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Separator } from '@components/ui/separator';
import { Music, ListMusic, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import useGenreSheet from '@/store/genresSheet.store';

import defaultCover from '@assets/images/default-cover.jpg';

function GenreCard(genre) {
  const { title, cover, description, tags, songsCount, albumsCount } = genre;
  const setIsGenreSheetOpen = useGenreSheet((state) => state.setOpen); // open open edit/upload genre form
  const setIsEditMode = useGenreSheet((state) => state.setIsEditMode); // set edit/uplaod genre form mode
  const setGenre = useGenreSheet((state) => state.setGenre); // set seleced genre to edit

  const openGenreSheet = () => {
    setGenre(genre);
    setIsEditMode(true);
    setIsGenreSheetOpen(true);
  };

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
      <CardContent className="-mt-1 flex grow flex-col px-3">
        <div className="h-full grow">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-balance">{title}</h3>
            <p className="text-muted-foreground mt-1 text-xs text-pretty">{description}</p>
          </div>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
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
          <Button variant="outline" className="text-destructive grow">
            <TrashIcon />
            Delete
          </Button>
          <Button variant="outline" className="grow" onClick={openGenreSheet}>
            <PencilIcon />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default GenreCard;
