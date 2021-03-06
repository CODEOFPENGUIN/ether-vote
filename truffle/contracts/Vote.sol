pragma solidity ^0.4.24;
import "./Ownable.sol";
import "./stringUtil.sol";
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract VoteContract is Ownable, StringUtil {
    //using strings for *;
    
    struct voter {
        string name;
        bool voted;
    }

    struct vote {
        mapping(uint => candidate) candidates;
        uint candidateSeq;
        mapping(address => voter) voters;
        int voteCnt;
        bool isEnd;
        string voteName;
    }

    struct candidate {
        string name;
        string imgPath;
        address[] voters;
    }

    mapping(uint256 => vote) voteHst;
    uint256 voteSeq = 0;

    function addCandidate(uint256 vSeq, string memory _name, string memory _imgPath) public onlyOwner {
        //require(voteHst[voteSeq].candidates[candidateSeq].voters.length > 0, "이미 기투표자가 존재합니다.");
        uint seq = voteHst[vSeq].candidateSeq;
        voteHst[vSeq].candidates[seq].name = _name;
        voteHst[vSeq].candidates[seq].imgPath = _imgPath;
        voteHst[vSeq].candidateSeq += 1;
    }

    function addVote(string memory vName) public onlyOwner {
        voteHst[voteSeq].isEnd = false;
        voteHst[voteSeq].voteName = vName;
        voteHst[voteSeq].voteCnt = 0;
        voteSeq += 1;
    }
    function voting(uint256 vSeq, uint cSeq, string memory _name) public {
        voteHst[vSeq].voters[msg.sender].name = _name;
        voteHst[vSeq].voters[msg.sender].voted = true;
        voteHst[vSeq].voteCnt += 1;
        voteHst[vSeq].candidates[cSeq].voters.push(msg.sender);
    }
    
    function getVoteCount(uint256 vSeq) public view returns (int) {
        return voteHst[vSeq].voteCnt;
    }

    function isVoted(uint256 vSeq, address vt) public view returns (uint256 _vSeq, bool _isVoted){
        _vSeq = vSeq;
        _isVoted = voteHst[vSeq].voters[vt].voted;
    }

    function getVoteName(uint256 vSeq) public view returns (uint256 key, string value){
        key = vSeq;
        value = voteHst[vSeq].voteName;
    }

    function getVoteSeq() public view returns(uint256){
        return voteSeq;
    }

    function getWinner(uint256 vSeq) public view returns (string winnerName, uint cSeq) {
        int voteCnt = -1;
        for(uint i = 0; i < voteHst[vSeq].candidateSeq; i++){
            int vCnt = int(voteHst[vSeq].candidates[i].voters.length);
            if(voteCnt < vCnt) {
                voteCnt = vCnt;
                winnerName = voteHst[vSeq].candidates[i].name;
                cSeq = i;
            }
        }
    }
    function getVoters(uint256 vSeq, uint256 cSeq, uint inx) public view onlyOwner returns (address) {
        return voteHst[vSeq].candidates[cSeq].voters[inx];
    }
    
    function getCandidateList(uint256 vSeq, uint256 cSeq) public view returns (string _name, string _imgPath) {
        _name = voteHst[vSeq].candidates[cSeq].name;
        _imgPath = voteHst[vSeq].candidates[cSeq].imgPath;
    }
    
    function getCandidateWithVotedList(uint256 vSeq, uint256 cSeq, address vt) public view returns (uint256 _cSeq, string _name, string _imgPath, bool _isVoted) {
        _cSeq = cSeq;
        _name = voteHst[vSeq].candidates[cSeq].name;
        _imgPath = voteHst[vSeq].candidates[cSeq].imgPath;
        _isVoted = false;
        uint _vCnt = voteHst[vSeq].candidates[cSeq].voters.length;
        for(uint i = 0; i < _vCnt; i++){
            if(voteHst[vSeq].candidates[cSeq].voters[i] == vt){
                _isVoted = true;
                break;
            }
        }
    }
    
    function getCandidateCnt(uint256 vSeq) public view returns (uint) {
        return voteHst[vSeq].candidateSeq;
    }

    
    function getVotesCount() public view returns (string list){
        string memory labelkey = "label";
        string memory datakey = "data";
        for(uint i = 0; i < voteSeq; i++){
            string memory jstr = "";
            jstr = jsonStr(labelkey, voteHst[i].voteName);
            int dataInt = voteHst[i].voteCnt;
            string memory data = "";
            if(dataInt == 0){
                data = "0";
            }
            else{
                data = uintToString(uint(voteHst[i].voteCnt));
            }
            jstr = jsonInt(jstr, datakey, data);
            jstr = compJsonStr(jstr);
            if(i == 0){
                list = jstr;
            }
            else{
                list = arrayAddJson(list, jstr);
            }
        }
        list = compArrayJson(list);
    }

    function initVoteData() public onlyOwner{
        addVote("test");
        addVote("test2");
        addCandidate(0, "test-penguin", "/img/penguin.jpg");
        addCandidate(0, "test-penguin2", "/img/penguin2.jpg");
        addCandidate(0, "test-penguin3", "/img/penguin3.jpg");
        addCandidate(0, "test-penguin4", "/img/penguin4.jpg");

        addCandidate(1, "test2-penguin", "/img/penguin.jpg");
        addCandidate(1, "test2-penguin2", "/img/penguin2.jpg");
        addCandidate(1, "test2-penguin3", "/img/penguin3.jpg");
        addCandidate(1, "test2-penguin4", "/img/penguin4.jpg");

    }

    function getCandidateVoteCount(uint256 vSeq) public view returns (string list){
        string memory labelkey = "label";
        string memory datakey = "data";
        string memory winnerKey = "winner";

        uint cSeq = voteHst[vSeq].candidateSeq;
        string memory winnername = "";
        uint _cSeq = 0;
        (winnername, _cSeq) = getWinner(vSeq);

        for(uint i = 0; i < cSeq; i++){
            string memory jstr = "";
            jstr = jsonStr(labelkey, voteHst[vSeq].candidates[i].name);
            uint dataInt = voteHst[vSeq].candidates[i].voters.length;
            string memory data = "";
            if(dataInt == 0){
                data = "0";
            }
            else{
                data = uintToString(dataInt);
            }
            jstr = jsonInt(jstr, datakey, data);

            if(_cSeq == i){
                jstr = jsonStr(jstr, winnerKey, "Y");
            }
            else{
                jstr = jsonStr(jstr, winnerKey, "N");
            }

            jstr = compJsonStr(jstr);

            if(i == 0){
                list = jstr;
            }
            else{
                list = arrayAddJson(list, jstr);
            }
        }
        list = compArrayJson(list);



    }
}