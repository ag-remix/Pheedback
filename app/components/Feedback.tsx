import type { Comment, Post, User } from '@prisma/client'
import type { FunctionComponent } from 'react'
import { Link } from 'remix'

import { Button, Card } from '~/components'
import { IconChevron, IconComment } from '~/icons'
import { formatDate } from '~/utils'

interface Props {
  asLink?: boolean
  post: Post & { user: User; comment: (Comment & { user: User })[] }
}

const Content: FunctionComponent<Props> = ({ post }) => {
  return (
    <>
      <Card className="flex gap-4 text-left ring-offset-2 transition-all group-hover:ring group-hover:ring-blue-500 group-focus:ring group-focus:ring-blue-500">
        <div className="mb-14 flex-1 space-y-4 sm:mb-0 sm:ml-20">
          <div className="flex items-center gap-4">
            {/* TODO: add logic to generate pseudo-random number for image seed */}
            <img alt="user avatar" className="h-10 w-10" src="https://avatars.dicebear.com/api/human/339.svg" />
            <div className="text-sm">
              <h2 className="font-bold">{post.user?.fullname}</h2>
              <span className="text-gray-500">{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div>
            <h2 className="font-bold">{post.title}</h2>
            <p className="text-gray-500">{post.detail}</p>
          </div>
          <span className="block w-max rounded-lg bg-blue-50 py-2 px-3 text-sm font-semibold text-blue-500">
            {post.category}
          </span>
        </div>
        <div className="absolute bottom-8 right-6 flex items-center gap-2 sm:static">
          <IconComment />
          <span>{post.comment?.length || 0}</span>
        </div>
      </Card>
    </>
  )
}

const Cta: FunctionComponent<{ upvotes: number }> = ({ upvotes }) => {
  return (
    <Button
      className="absolute bottom-6 left-6 z-10 flex h-max items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 font-semibold text-blue-50 transition-all duration-300 hover:-translate-y-1 hover:opacity-70 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:top-6 sm:block sm:py-3 sm:px-4"
      variant="unstyled"
    >
      <IconChevron className="h-3 w-4" />
      {upvotes}
    </Button>
  )
}

const Feedback: FunctionComponent<Props> = ({ asLink = false, post }) => {
  if (asLink) {
    return (
      <>
        <Link className="group focus:outline-none" prefetch="intent" to={`/post/${post.id}`}>
          <Content post={post} />
        </Link>
        <Cta upvotes={post.upvotes} />
      </>
    )
  }

  return (
    <>
      <Content post={post} />
      <Cta upvotes={post.upvotes} />
    </>
  )
}

export default Feedback
