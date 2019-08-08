const TopScoreService = {
  getTopScore: function() {
    return localStorage.getItem("topScore") || 0;
  },
  setTopScore: function(score) {
    if (score > this.getTopScore()) {
      localStorage.setItem("topScore", score);
    }
  }
};

export default TopScoreService;
