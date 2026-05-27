import { Table, TableCaption, TableBody, TableCell, TableRow } from '@components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar';
import { Skeleton } from '@components/ui/skeleton';
import { Badge } from '@components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

import { getRecentActivitiesQuery } from '@/queries/stats';
import defaultAvatar from '@assets/images/default-avatar.png';
import { timeAgo } from '@/utils';

const actions = {
  DELETE: 'Deleted',
  UPDATE: 'Updated',
  INSERT: 'Created',
};

// gnerates related text based on user actions (perforemd which action on which media).
const generateText = (mediaType, metadata, action) => {
  if (mediaType === 'albums') return `${actions[action]} album "${metadata.title}"`;
  if (mediaType === 'artists') return `${actions[action]} artist "${metadata.name}"`;
  if (mediaType === 'genres') return `${actions[action]} genre "${metadata.title}"`;
  if (mediaType === 'playlists') return `${actions[action]} playlist "${metadata.title}"`;
  if (mediaType === 'songs') return `${actions[action]} song "${metadata.title}"`;
  if (mediaType === 'plays')
    return `Played ${metadata.target_type === 'album' ? 'an' : 'a'} ${metadata.target_type}`;
  if (mediaType === 'playlist_songs')
    return `${action === 'INSERT' ? 'Added' : 'Removed'} a song ${action === 'INSERT' ? 'to' : 'from'} a playlist`;
  if (mediaType === 'likes')
    return `${action === 'INSERT' ? 'Added' : 'Removed'} ${metadata.target_type === 'album' ? 'an' : 'a'} ${metadata.target_type} ${action === 'INSERT' ? 'to' : 'from'} favorites`;
  return 'Performed an action'; // Default
};

function RecentActivityTable() {
  const { data, isPending } = useQuery(getRecentActivitiesQuery());
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <div className="max-h-110 max-w-[calc(100dvw-50px)] overflow-x-auto overflow-y-auto md:max-w-[calc(100dvw-306px)]">
        <CardContent className="px-0 min-[375px]:px-6">
          <Table>
            <TableCaption>Recent Activity</TableCaption>
            <TableBody>
              {isPending
                ? Array(5)
                    .fill()
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex w-40 items-center gap-3 lg:w-55">
                          <Skeleton className="size-8 shrink-0 overflow-hidden rounded-full"></Skeleton>
                          <div className="grow space-y-2">
                            <Skeleton className="h-2 max-w-40 min-w-15"></Skeleton>
                            <Skeleton className="h-2 max-w-20"></Skeleton>
                          </div>
                        </TableCell>
                        <TableCell className="w-full min-w-50 px-4">
                          <Skeleton className="mx-auto h-2.5 max-w-[320px]"></Skeleton>
                        </TableCell>
                        <TableCell className="hidden capitalize min-[1100px]:table-cell">
                          <Skeleton className="me-auto h-4.5 max-w-16 min-w-16"></Skeleton>
                        </TableCell>
                        <TableCell className="min-w-25">
                          <Skeleton className="ms-auto h-2"></Skeleton>
                        </TableCell>
                      </TableRow>
                    ))
                : data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={item.actor.avatar} />
                          <AvatarFallback>
                            <img
                              src={defaultAvatar}
                              alt={item.actor.full_name}
                              className="size-full object-cover"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{item.actor.full_name}</p>
                            <Badge
                              className={cn(
                                'xs:text-xs text-[10px] capitalize',
                                item.actor.role === 'super_admin' && 'bg-blue-500 text-white'
                              )}
                              variant={item.actor.role === 'user' ? 'secondary' : 'default'}
                            >
                              {item.actor.role.replace('_', ' ')}
                            </Badge>
                          </div>
                          <span className="text-muted-foreground xs:text-xs text-[11px]">
                            {item.actor.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">
                          {generateText(item.entity_type, item.metadata, item.action)}
                        </p>
                      </TableCell>

                      <TableCell className="hidden capitalize min-[1100px]:table-cell">
                        <Badge variant="secondary">{item.entity_type.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <p title={item.created_at} className="text-muted-foreground text-xs">
                          {timeAgo(item.created_at)}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}

export default RecentActivityTable;
