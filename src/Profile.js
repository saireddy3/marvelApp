import React from 'react';
import './Profile.css';
function Profile(props) {
    console.log(props)
    const { data } = props.data;
    const { type } = props.data;
    document.title = data.name || data.title;
    return (
        <div  >
            {type === 0 &&
                <div>
                    <h2>Character Details</h2>
                    <table id="table">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{data.description}</td>
                            </tr>
                            <tr>
                                <td>Urls</td>
                                <td>
                                    {data.urls.length > 0 && data.urls.map((d,i) =>
                                        <div key={i}><a rel="noreferrer"  target="_blank"  href={d.url}>{d.type}</a><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Comics</td>
                                <td>
                                    {data.comics.items.length > 0 && data.comics.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Series</td>
                                <td>
                                    {data.series.items.length > 0 && data.series.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Stories</td>
                                <td>
                                    {data.stories.items.length > 0 && data.stories.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Events</td>
                                <td>
                                    {data.events.items.length > 0 && data.events.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            }
            {type === 1 &&
                <div>
                    <h2>Series Details</h2>
                    <table id="table">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.title}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{data.description}</td>
                            </tr>
                            <tr>
                                <td>Urls</td>
                                <td>
                                    {data.urls.length > 0 && data.urls.map((d,i) =>
                                        <div key={i}><a rel="noreferrer"  target="_blank" href={d.url}>{d.type}</a><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Characters</td>
                                <td>
                                    {data.characters.items.length > 0 && data.characters.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Creators</td>
                                <td>
                                    {data.creators.items.length > 0 && data.creators.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Comics</td>
                                <td>
                                    {data.comics.items.length > 0 && data.comics.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Events</td>
                                <td>
                                    {data.events.items.length > 0 && data.events.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            }
            {type === 2 &&
                <div>
                    <h2>Comic Details</h2>
                    <table id="table">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.title}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{data.description}</td>
                            </tr>
                            <tr>
                                <td>Urls</td>
                                <td>
                                    {data.urls.length > 0 && data.urls.map((d,i) =>
                                        <div key={i}><a  rel="noreferrer"  target="_blank" href={d.url}>{d.type}</a><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Characters</td>
                                <td>
                                    {data.characters.items.length > 0 && data.characters.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Events</td>
                                <td>
                                    {data.events.items.length > 0 && data.events.items.map((d,i) =>
                                        <div key={i}><span>{d.name}</span><br /></div>
                                    )}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
export default Profile;