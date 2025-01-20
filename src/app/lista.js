"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({ searchResults, loading }) {
  return (
    <List sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
      {loading ? (
        <Typography variant="body2" sx={{ textAlign: "center", padding: 2 }}>
          Cargando...
        </Typography>
      ) : searchResults.length === 0 ? (
        <Typography variant="body2" sx={{ textAlign: "center", padding: 2 }}>
          No se encontraron resultados.
        </Typography>
      ) : (
        searchResults.map((result) => (
          <div key={result.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={result.title}
                  src={result.poster || "default.jpg"}
                  sx={{ width: 120, height: 120 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={result.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      {result.year}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))
      )}
    </List>
  );
}
