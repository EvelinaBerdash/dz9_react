import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { api } from '../constants'

export function Articles() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getFetchArticles = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(api)
            if (res.ok) {
                const data = await res.json()
                setArticles(data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // fetch(api)
        //     .then((res) => res.json())
        //     .then((data) => setArticles(data))
        // getFetchArticles()
    }, [])


    return (
        <>
            <div>Articles</div>
            <Button
                variant="contained"
                color='success'
                onClick={getFetchArticles}
            >
                Get API
            </Button>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading && articles.map((article) => (
                <Box sx={{ display: 'flex', justifyContent: 'center' }} key={article.id}>
                    <Card sx={{ maxWidth: 700 }} >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={article.imageUrl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {article.summary}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            ))}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
}