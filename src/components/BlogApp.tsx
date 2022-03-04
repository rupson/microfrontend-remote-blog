import React from 'react';
import axios from 'axios';

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

const fetchPosts = () =>
	axios.get<Array<Post>>(`https://jsonplaceholder.typicode.com/posts`);

const BlogApp = () => {
	const [posts, setPosts] = React.useState<Array<Post> | undefined>(undefined);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		fetchPosts().then((res) => {
			setPosts(res.data);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div
				// height='100vh'
				// width='100%'
				// display='flex'
				// alignItems='center'
				// justifyContent='center'
				// flexDirection='column'
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'cneter',
					flexDirection: 'column',
				}}
			>
				<span>Fetching posts</span>
			</div>
		);
	}

	if (posts) {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1>Posts</h1>
				<div
					style={{
						justifyContent: 'center',
						justifyItems: 'center',
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{posts.map((post) => (
						<div
							key={`post_card_${post.id}`}
							className='card'
							style={{
								boxShadow: '#8373738a 2px 2px 2px 2px',
								borderRadius: '6px',
								width: '350px',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									margin: '15px',
									textAlign: 'left',
								}}
							>
								<h4>{post.title}</h4>
								<h5>By user {post.userId}</h5>
								<span>hello world!</span>
								<span>{post.body.slice(0, 20)}...</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return <div>Something terrible has happened</div>;
};

export default BlogApp;
