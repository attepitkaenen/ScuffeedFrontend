export type Post = {
    id: number,
    title: string,
    content: string,
    flair: Flair
};

export type Flair = {
    id: number,
    flairName: string
    posts: Post[]
}

export type PostRequest = {
    Title: string,
    Content: string,
    Flair: string
};
