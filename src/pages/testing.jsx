<Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
  <Box sx={{ flexGrow: 1 }}>
    {isExpanded ? (
      <DarkBox>
        <Box display="flex" justifyContent="end" marginBottom={2}>
          <Box>
            <Typography variant="body2">{commentsCount} Comments</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-start" marginBottom={2}>
          <Avatar src={userAvatar} sx={{ marginRight: 1 }} />
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your thoughts"
            value={comment}
            onChange={handleCommentChange}
            variant="outlined"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <StyledIconButton>⬆️</StyledIconButton>
            <StyledIconButton>⬇️</StyledIconButton>
            <StyledIconButton>🔗</StyledIconButton>
            <StyledIconButton>@</StyledIconButton>
          </Box>
          <StyledButton variant="contained" onClick={handleSubmit}>
            Comment
          </StyledButton>
        </Box>
      </DarkBox>
    ) : (
      <Box
        onClick={handleExpand}
        sx={{
          display: "flex",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "4px",
          m: 0.5,
          marginBottom: "20px",
          p: 1,
          alignItems: "center",
          cursor: "text",
          color: "text.secondary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Avatar src={userAvatar} sx={{ mr: 1 }} />
        Share your thoughts
      </Box>
    )}
  </Box>
</Box>;
